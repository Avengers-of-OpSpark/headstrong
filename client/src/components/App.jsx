import React, { Component } from 'react';
import Entry from './Entry.jsx';
import Memory from './Memory.jsx';
import Resources from './Resources.jsx';
import Feed from './Feed.jsx';
import Board from './Board.jsx';
import axios from 'axios';
import Friends from './Friends.jsx'
import GoogleButton from 'react-google-button';
import css from './style.css';
import { AppBar, Button } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      quoteText: '',
      quoteAuthor: '',
      login: false,
      view: 'feed',
      entries: [],
      memory: null,
      quote: [],
    };
    this.getFriends = this.getFriends.bind(this)
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.getRandomMemory = this.getRandomMemory.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getAllUsersFeed = this.getAllUsersFeed.bind(this);
    this.getAllPublicJournals = this.getAllPublicJournals.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.changePosts = this.changePosts.bind(this);
  }
  //change views depending on what you click
  changeView(option) {
    this.setState({
      view: option,
    });
  }
  getAllPublicJournals() {
    axios.get('/api/journals/public')
      .then(({ data }) => {

        this.setState({
          entries: data
        });
      }).catch(err => console.log(err));
  }
  // get a feed of all user public entries
  getAllUsersFeed() {
    axios.get('/api/journals')
      .then(({ data }) => {
        this.setState({
          entries: data
        });
      }).catch((err) => console.error(err));
  }
  // get random quote for home page
  //test
  getRandomQuote() {
    axios.get('/api/quotes')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length + 1);
        this.setState({
          quoteText: data[ randomIndex ].text,
          quoteAuthor: data[ randomIndex ].author
        });
        const { quoteAuthor } = this.state;
        if (quoteAuthor === null) {
          this.setState({ quoteAuthor: 'Anonymous' });
        }
      }).catch((err) => console.error(err));
  }
  getQuote() {
    axios.get('/quote')
      .then(quote => {

        this.setState({ quote: quote.data });
      }
      ).catch(err => console.log('Error Getting Quote', err));
  }
  // get random memory for memory page
  getRandomMemory() {
    axios.get('/api/journals')
      .then(({ data }) => {

        const randomIndex = Math.floor(Math.random() * data.length);
        this.setState({
          memory: data[ randomIndex ]
        });
      }).catch((err) => console.error(err));
  }
  changePosts(e){
this.setState({
 comments: e.target.value
})
  }
  getFriends(){
    axios.get('/friends')
    .then(data => console.log('Data getting friends', data))
    .catch(err => console.log('error getting friends', err))
  }
  // render view based on nav
  renderView() {
    const { view, entries, quoteText, quoteAuthor, memory, quote, comments } = this.state;
    if (view === 'feed') {
      return <Feed entries={ entries }

        quoteText={ quoteText }
        changePosts={ this.changePosts }
        quoteAuthor={ quoteAuthor }/>;
    } else if (view === 'entry') {
      return <Entry logout={ this.logout }/>;
    } else if (view === 'resource') {
      return <Resources />;
    }
    else if (view === 'friends') {
      return <Friends entries={ entries }/>;
    } else if (view === 'chat') {
      return <ChatRoom />;
    } else if (view === 'board') {
      return <Board />;
    } else if (view === 'memory') {
      return (<div>
          {memory ?
              <Memory logout={ this.logout } memory={ memory } changeMemory={ this.getRandomMemory } quote={ quote }/> : <div className='text wrap'
            style={ { display: 'flex', flexDirection: 'column', align: 'center', justify: 'center', alignItems: 'center' } }>
                  <img src="https://content.invisioncic.com/r143258/monthly_2016_01/b5b2b1603073cc426b410d1ba620685d.jpg.28d5f653fbeaef692ba8a5f70aaf1f44.jpg"/>
                  <h1><i>Ruh roh!</i></h1>
                  <h3>It looks like you don't have any memories yet.
                      Write an entry to view a random memory.</h3>
                  <div className='likedQuotes'>
                      {quote.map((element, index) => <div>
                          <div key={ index } className='likedQuote'><span>{ element.author}</span>:<br></br><span>{ element.body} </span></div>
                      </div>)}

                  </div>
              </div>
        }
      </div>);
    }
  }
  componentDidMount() {
    this.getFriends();
    this.getRandomQuote();
    this.getQuote();
    this.getRandomMemory();
    this.renderView();
    this.getAllUsersFeed();
    this.getAllPublicJournals();
    axios.get('/isloggedin')
      .then(({ data }) =>
        this.setState({
          login: data
        }))
      .catch((err) => console.warn(err));
  }
  logout(bool) {
    this.setState({
      login: bool
    });
  }
  render() {
    const { login, view, roomName } = this.state;
    return (
        <div>
            {
          !login
            ? <div>
                <img className='background' src='https://i.ibb.co/WWs7MZd/headstrong-girl-blue.jpg'/>
                <div className='loginMain'>
                    <div className="text">
                        <h1>Welcome To HeadStrong!</h1>
                        <h3>A stress-free, judgment free zone for you to get your thoughts out</h3>


                    </div>
                </div>

                <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
                <div className='footer'>
                    <div className='logo2'>
                        HeadStrong
                    </div>
                    <div className='footer-text'>
                        Since 2021
                    </div>
                </div>
            </div>
            :
            <div>

                <AppBar>
                    <div className='logo'>
                        HeadStrong
                    </div>
                    <div>
                        <div className='nav'>
                            <div className={
                      (view === 'feed') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => this.changeView('feed') }>Home</Button>
                            </div>
                            <div className={
                      (view === 'entry') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => this.changeView('entry') }>Write Entry</Button>
                            </div>
                            <div className={
                      (view === 'resource') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => this.changeView('resource') }>Resources</Button>
                            </div>
                            <div className={
                      (view === 'chat') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => this.changeView('friends') }>Friends</Button>
                            </div>
                            <div className={
                      (view === 'board') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => this.changeView('board') }>Draw</Button>
                            </div>
                            <div className={
                      (view === 'memory') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => this.changeView('memory') }>Memory</Button>
                            </div>
                            <div className={
                      (view === 'logout') ? 'currentButton' : 'button' }>
                                <Button
                        className='Button'
                        onClick={ () => axios.delete('/logout')
                          .then(({ data }) => this.logout(data))
                          .catch((err) => console.warn(err)) }
                      >Logout</Button>
                            </div>
                        </div>
                    </div>
                </AppBar>
                                  <div><input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={this.handleRoomNameChange}
        className="text-input-field"
      />
      </div>
                <div>
                    <img className='background' src='https://i.ibb.co/WWs7MZd/headstrong-girl-blue.jpg'/>
                    <div className='footer'>
                        <div className='logo2'>
                            HeadStrong
                        </div>
                        <div className='footer-text'>
                            Since 2021
                        </div>
                    </div>
                    <div className='main'>
                        {this.renderView()}
                    </div>
                </div>
            </div>
        }
        </div>
    );
  }
}
export default App;
