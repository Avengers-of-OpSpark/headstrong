/* eslint-disable camelcase */
/* eslint-disable no-undef */
const path = require('path');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cloudinary = require('cloudinary');
const { Quotes } = require('./api/quotes');
const { Weather } = require('./api/weather');
const { Location } = require('./api/geolocation');
const { db, getAllJournals, addJournals, deleteJournal, updateJournal, getAllPublicJournals, Entries, Friends } = require('./db/dbBase.js');
const { GoogleStrategy } = require('./passport.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sequelize = require('./db/dbBase.js');
const cors = require('cors');
const formData = require('express-form-data');

const { Quote } = require('./db/dbBase.js');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const port = process.env.PORT || 8080;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const dist = path.resolve(__dirname, '..', 'client', 'dist');

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dist));
app.use('/api/quotes', Quotes);
app.use('/api/weather', Weather);
app.use('/api/location', Location);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors());
app.use(formData.parse());
// line 34 - 61 all used for google login
app.use(
  session({
    secret: process.env.clientSecret,
    saveUninitialized: false,
    resave: true,
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// this is the google login route
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.login' ] }));

// redirect route for google login
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // setting cookie key to headstrong and saving the username
    res.cookie('Headstrong', req.user.displayName);
    res.redirect('/');
  });

app.get('/isloggedin', (req, res) => {
  // check to see if the cookie key is headstrong
  if (req.cookies.Headstrong) {
    res.json(true);
  } else {
    res.json(false);
  }
});
app.post('/friends', (req, res) => {

const { friends } = req.body;
const username = req.cookies.Headstrong;
if(username !== friends){
  const friend = new Friends({ friends, username });

  friend.save()
    .then(() => console.log('Friend Saved'))
    .catch(err => console.log('Server Quote Error', err));

}
})

// route to logout
app.delete('/logout', (req, res) => {
  // delete the cookie key headstrong when logging out
  res.clearCookie('Headstrong');
  res.json(false);
});

app.get('/api/journals/public', (req, res) => {
  return getAllPublicJournals()
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

app.get('/api/journals', (req, res) => {
  return getAllJournals(req.cookies.Headstrong)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.post('/api/journals', (req, res) => {
//passing saved cookie with users name to add journals

  return addJournals(req.body, req.cookies.Headstrong)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

// app.post('/api/journals', (req, res) => {
//   //passing saved cookie with users name to add journals
//   return addJournals(req.body, req.cookies.Headstrong)
//     .then((data) => res.json(data))
//     .catch((err) => console.warn(err));
// });
app.get('/friends', (req, res) => {
  Friends.findAll({})
    .then(data => Quotes.findAll({}))

    .catch(err => console.log('Error Getting Friends', err));
})
app.delete('/api/journals/:id', (req, res) => {
  return deleteJournal(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.put('/api/journals', (req, res) => {
  console.info(req.body);
  return updateJournal(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

app.post('/quotes', (req, res) => {
  const { author, body } = req.body;

  const newQuote = new Quote({ author, body });
  newQuote.save()
    .then(() => console.log('Quote Saved!'))
    .catch(err => console.log('Server Quote Error', err));
});
app.get('/quote', (req, res) => {
  Quote.findAll({})
    .then(data => res.send(data))
    .catch(err => console.log('Error Getting Quote', err));
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
app.listen(port, () => {
  console.log(`listening on *:${ port }`);
});
