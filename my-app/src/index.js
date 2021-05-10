import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  console.log('props.activeSquare: ' + props.activeSquare);
    return (
        <button 
            className={props.activeSquare ? 'square square--selected' : 'square'}
            onClick={props.onClick}
            
        >
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      //console.log(this.props);
      //console.log(i);
      return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            activeSquare={this.props.activeSquare === i}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history : [{
          squares: Array(9).fill(null),
          move_col: null,
          move_row: null,
          selectedSquare: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          move_col: getCol(i),
          move_row: getRow(i),
          selectedSquare: i,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
      //console.log(this.state.activeSquare);
      //console.log(this.state.xIsNext);
      //console.log(this.state.stepNumber)
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
      //console.log('Capture');
      //console.log(step);
      //console.log(this.state.stepNumber);
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      //console.log('this.state.stepNumber: ' + this.state.stepNumber);
      const moves = history.map((step, move) => {
        console.log('move: ' + move + '; this.state.stepNumber: ' + this.state.stepNumber);
        const desc = move ?
          'Go to move #' + move + ' - ('+ step.move_row + ', ' + step.move_col + ')' :
          'Go to game start';
          return (
            <li 
              key={move} 
              className={this.state.stepNumber === move ? 'move--active' : ''}
            >
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
      });
      
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      }
      else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      //console.log(this.state.history.activeSquare);
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              activeSquare={current.selectedSquare}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function getRow(i) {
    if (i < 3 && (i-2) <= 0) {
      return 1;
    }
    if (i < 6 && (i-5) <= 0) {
      return 2;
    }
    if (i < 9 && (i-8) <= 0) {
      return 3;
    }
  }

  function getCol(i) {
    
    switch (i % 3) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      default:
        return;
    }
  }