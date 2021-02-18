import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';




const Feed = ({ quoteText, quoteAuthor, entries, changePosts }) => {

    const time = moment().format('MMMM Do YYYY, h:mm:ss a');

  return (
      <div className='text wrap'>


          <div>
              <h1>{quoteText}</h1>
              <h2 style={ { marginRight: 5 } }><i>- {quoteAuthor}</i></h2>
              <br></br>
              <button className='btn btn-primary btn-block ' type='submit' onClick={ () =>{
          const data = { author: quoteAuthor, body: quoteText };
          axios.post('/quotes', data)
            .then(response => console.log('Quote Added', response))
            .catch(err => console.log('Axios Quote Error', err));
        }
        }>Like</button>




              <h1>Public Posts<div>





</div></h1>
              <hr></hr>
              {entries.map(entry =>
                  <div key={ entry.id } id='comments' >
                      <div>{`User:${entry.username}`}</div>
                      <div>{`Title:${entry.title}`}</div>
                      <div>{`Message: ${entry.blog}`}</div>
                   {entry.journalImage ?  <div ><img height='200px' width='300px' src={entry.journalImage}/></div> : null}
                      <div>{`Posted: ${entry.createdAt}`}<button onClick={() => { const data = {
                            friends: entry.username,
                                }
                             axios.post('/friends', data)
                              .then(data => console.log('Friend added'))
                              .catch(err => console.log('Error adding friend', err))
                                            }}  style={{marginLeft: 10}}
    className='btn btn-default  btn-block'>Follow</button></div>
                      <hr></hr>
                  </div>).sort()}
          </div>
      </div>
  );
};

export default Feed;
