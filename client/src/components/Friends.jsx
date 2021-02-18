import React from 'react'

const Friends = ({entries}) => {
console.log('ggggg', entries)
  return(
    <div>
    <hr></hr>
    {entries.map(entry =>
        <div key={ entry.id } id='comments' >
            <div>{`User:${entry.username}`}</div>
            <div>{`Title:${entry.title}`}</div>
            <div>{`Message: ${entry.blog}`}</div>
              {entry.journalImage ?  <div ><img height='200px' width='300px' src={entry.journalImage}/></div> : null}
            <div>{`Posted: ${entry.createdAt}`}</div>
            <hr></hr>
        </div>).sort()}



    </div>
  )
}

export default Friends