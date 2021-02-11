const path = require('path');
const express = require('express');
const { Quotes } = require('./api/quotes');
const { Weather } = require('./api/weather');
const { Location } = require('./api/geolocation');
const { db, getAllJournals, addJournals, deleteJournal, updateJournal } = require('./db/dbBase.js');
const { GoogleStrategy } = require('./passport.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sequelize = require('./db/dbBase.js');
const { GOOGLE_API_KEY } = require('../.env')
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const port = process.env.PORT || 8080;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dist));
app.use('/api/quotes', Quotes);
app.use('/api/weather', Weather);
app.use('/api/location', Location);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

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

// route to logout
app.delete('/logout', (req, res) => {
  // delete the cookie key headstrong when logging out
  res.clearCookie('Headstrong');
  res.json(false);
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

app.listen(port, () => {
  console.log(`Server is listening on http://127.0.0.1:${ port }`);
});
