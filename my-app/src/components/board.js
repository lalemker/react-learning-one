import React from 'react';
import '../styles/index.css';

export function Square(props) {
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
  
  export default class Board extends React.Component {
    renderSquare(i) {
      //console.log(this.props);
      //console.log(i);
      return (
        <Square 
            key={i}
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
        boardRows.push(<div key={row.toString()} className="board-row">{rowSquares}</div>);
      };
      
      return (
        <div>
          <h1>--- X --- Tic Tac Toe Board --- O ---</h1>
          <div>
            {boardRows}
          </div>
        </div>
      );
    }
  }