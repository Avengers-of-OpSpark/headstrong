import React from 'react';

const Quote = ({ quoteText, quoteAuthor }) => {

  return (
    <div className='text wrap'>
      <div>
        <h1>{quoteText}</h1>
        <h2><i>- {quoteAuthor}</i></h2>
      </div>
    </div>
  );
};

export default Quote;

