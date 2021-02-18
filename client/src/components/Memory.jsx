import React from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const Memory = ({ memory, changeMemory, quote }) => {
    console.log('quote', quote)

  const { id, username, title, blog, journalImage, createdAt, temp, weatherDescription, mood } = memory;
  const timeStamp = moment(createdAt).format('MMM Do YY');

  return (
      <div className='text wrap' key={ id }>
          <h2>Welcome back {username},</h2>
          <br></br>
          <div><i>Your memory from {timeStamp} | It was {temp} and {weatherDescription} and you were feeling {mood}% happy!</i></div>
          <br></br>
          <div><h2>{title}</h2></div>
          <div><p>{blog}</p></div>
          <br></br>
          <div><img style={ { height: '200px', width: '300px' } } src={ journalImage } alt="Memory Image" width="400px" height="auto" overflow="hidden"/></div>
          <div>
              <Button
          className='Button'
          style={ { color: 'white' } }
          onClick={ () => axios.delete(`/api/journals/${ id }`)
            .then(() => changeMemory())
            .catch((err) => console.warn(err)) }>
                  <DeleteIcon/>
              </Button>
              <Button
          className='Button'
          style={ { color: 'white', fontFamily: 'Roboto' } }
          onClick={ () => changeMemory() }>
                  View Another Memory
              </Button>
          </div>
          <div className='likedQuotes'>
              {quote.map((element, index) => <div>
                  <div key={ index } className='likedQuote'><span>{ element.author}</span>:<br></br><span>{ element.body} </span></div>

              </div>)}

          </div>
      </div>
  );
};

export default Memory;
