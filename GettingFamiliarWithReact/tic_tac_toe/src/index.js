import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Square extends React.Component {

    render() {
      return (
        <button className="square" onClick={this.props.onClick}>
          {/* TODO */}
          {this.props.value}
        </button>
      );
    }
  }


  function calculateWinner(squares){
      let rowVal=0,colVal=0,i=0,j=0
      const asciiX = 'X'.charCodeAt(),asciiO = 'O'.charCodeAt()
      for(i=0;i<3;i++){
          for(j=0;j<3;j++){
                
                rowVal += squares[i][j].charCodeAt()
                colVal += squares[j][i].charCodeAt()
          }
          if( ((rowVal % asciiX) === 0) || ((rowVal % asciiO) === 0) )
                return squares[i][0]
          if( ((colVal % asciiX) === 0) || ((colVal % asciiO) === 0) )
                return squares[0][i]
          
           rowVal=0
           colVal=0
      }

      const diag1 = squares[0][0].charCodeAt() + squares[1][1].charCodeAt() + squares[2][2].charCodeAt()
      if(  ((diag1 % asciiX) === 0) || ((diag1 % asciiO) === 0) )
            return squares[0][0]

      const diag2 = squares[2][0].charCodeAt() + squares[1][1].charCodeAt() + squares[0][2].charCodeAt()
      if((  ((diag2 % asciiX) === 0) || ((diag2 % asciiO) === 0) ))
            return squares[2][0]
        
      return false
  } 
  
  class Board extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            squares : [Array(3).fill(""),Array(3).fill(""),Array(3).fill("")],
            xIsNext: true
        }

    }
    handleClick(i,j) {
        const squares = this.state.squares.slice()

        if (calculateWinner(squares) || squares[i][j]) return

        squares[i][j] = this.state.xIsNext ? 'X':'O'
        this.setState({
            squares:squares,
            xIsNext : !this.state.xIsNext
        })

    }
    renderSquare(i,j) {
      return <Square  value={this.state.squares[i][j]} 
                onClick = {this.handleClick.bind(this,i,j)}/>
    }
  
    render() {

      const winner = calculateWinner(this.state.squares);
      let status;
        if (winner)    
            status = 'Winner: ' + winner;   
        else      
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');   
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0,0)}
            {this.renderSquare(0,1)}
            {this.renderSquare(0,2)}
          </div>
          <div className="board-row">
            {this.renderSquare(1,0)}
            {this.renderSquare(1,1)}
            {this.renderSquare(1,2)}
          </div>
          <div className="board-row">
            {this.renderSquare(2,0)}
            {this.renderSquare(2,1)}
            {this.renderSquare(2,2)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  