import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Board from '../components/board'
import '@testing-library/jest-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Board />, div);
});

it('renders with title h1 text', () => {
  const div = document.createElement('div');
  render(<Board />);
  expect(screen.getByText('--- X --- Tic Tac Toe Board --- O ---')).toBeInTheDocument();
});

it('renders with 4 x 4 board', () => {
  let testRows = 4;
  let testCols = 4;
  let testSquares = Array(testRows*testCols).fill(null);
  let squaresCount = testRows * testCols;
  const div = document.createElement('div');
  render(<Board 
    squares={testSquares}
    onClick={(i) => this.handleClick(i)}
    activeSquare={null}
    winningSquares={null}
    rows={testRows}
    cols={testCols}
  />);
});