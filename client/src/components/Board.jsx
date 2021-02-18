import React from 'react'
import { BigWhiteboard } from 'react-component-whiteboard'

class Board extends React.Component {
  render() {
    return (
      <div >
        <div>
        <h1 id='title'>Draw Something</h1>
        </div>
        <div id='whiteBoard' >
        <BigWhiteboard/>

        </div>
      </div>
    )
  }
}

export default Board;