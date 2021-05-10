import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  //console.log('props.activeSquare: ' + props.activeSquare);
  return (
      <button 
          className={props.activeSquare && !props.winnerSquare ? 
                      'square square--selected' : 
                      props.winnerSquare ?
                        'square square--winner' :
                        'square'}
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
            winnerSquare={this.props.winningSquares ? this.props.winningSquares.includes(i) : false}
        />
      );
    }
    
    render() {
      const rows = this.props.rows;
      const cols = this.props.cols;
      let boardRows = [];
      
      for (let row = 0; row < rows; row++) {
        let rowSquares = []
        for (let col = 0; col < cols; col++) {
          rowSquares.push(this.renderSquare(row*rows+col));
        };
        boardRows.push(<div className="board-row">{rowSquares}</div>);
      };
      
      return (    
        <div>
          {boardRows}
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
          moveCol: null,
          moveRow: null,
          selectedSquare: null,
          winningSquares: null,
        }],
        stepNumber: 0,
        xIsNext: true,
        sortDescending: false,
      }
      this.rows=3;
      this.cols=3;
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
          moveCol: getCol(this.cols,i),
          moveRow: getRow(this.rows,i),
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

    toggleSort() {
      this.setState({
        sortDescending: !this.state.sortDescending
      });
      //console.log('sortDescending: ' +!this.state.sortDescending);
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      //console.log('this.state.stepNumber: ' + this.state.stepNumber);
      const moves = history
        .map((step, move) => {
        //console.log('move: ' + move + '; this.state.stepNumber: ' + this.state.stepNumber);
        const desc = move ?
          'Go to move #' + move + ' - ('+ step.moveRow + ', ' + step.moveCol + ')' :
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

      const sorted_moves = [].concat(moves)
        .sort((a,b) => (!this.state.sortDescending) ? 1 : -1)
      
      let status;
      if (winner) {
        status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
      }
      else if (this.state.stepNumber === (this.rows * this.cols)) {
        status = 'Draw: no more moves available';
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
              winningSquares={winner}
              rows={this.rows}
              cols={this.cols}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
              <button onClick={() => this.toggleSort()}>
                {this.state.sortDescending ? 'Sort Moves Ascending' : 'Sort Moves Descending'}
              </button>
            </div>
            <ol>{sorted_moves}</ol>
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
        return lines[i];
      }
    }
    return null;
  }

  function getRow(rows,i) {
    for(let n = 0; n < rows; n++) {
      let row = (i-rows*n) < rows ? n+1 : null
      if (row != null) {
        return row;
      }
    }
    return null;
  }

  function getCol(cols,i) {
    return (i % cols) + 1
  }