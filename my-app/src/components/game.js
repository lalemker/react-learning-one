import React from 'react';
import {calculateWinner, getRow, getCol, calculateWinningCombos} from '../helpers/util';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.rows=4;
    this.cols=4;
    this.state = {
      history : [{
        squares: Array(this.rows*this.cols).fill(null),
        moveCol: null,
        moveRow: null,
        selectedSquare: null,
        winningSquares: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortDescending: false,
      winningCombos: calculateWinningCombos(this.rows, this.cols),
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares, this.state.winningCombos) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState((state,props) => ({
      history: history.concat([{
        squares: squares,
        moveCol: getCol(this.cols,i),
        moveRow: getRow(this.rows,i),
        selectedSquare: i,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    }));
    //console.log(this.state.activeSquare);
    //console.log(this.state.xIsNext);
    //console.log(this.state.stepNumber)
  }

  jumpTo(step) {
    this.setState((state,props) => ({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    }));
    //console.log('Capture');
    //console.log(step);
    //console.log(this.state.stepNumber);
  }

  toggleSort() {
    this.setState((state,props) => ({
      sortDescending: !state.sortDescending
    }));
    //console.log('sortDescending: ' +!this.state.sortDescending);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.state.winningCombos);
    
    //console.log('this.state.stepNumber: ' + this.state.stepNumber);
    const moves = history
      .map((step, move) => {
      //console.log('move: ' + move + '; this.state.stepNumber: ' + this.state.stepNumber);
      const desc = move ?
        'Go to move #' + move + ' - ('+ step.moveRow + ', ' + step.moveCol + ')' :
        'Go to game start';
        return (
          <li 
            key={move.toString()} 
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
          <div id="status">{status}</div>
          <div id="sort--interface">
            <button key="sort-button" onClick={() => this.toggleSort()}>
              {this.state.sortDescending ? 'Sort Moves Ascending' : 'Sort Moves Descending'}
            </button>
          </div>
          <ol key="moves">{sorted_moves}</ol>
        </div>
      </div>
    );
  }
}
