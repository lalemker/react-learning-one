import {calculateWinner, getRow, getCol, calculateWinningCombos, compareMultiDimArrayContents} from '../helpers/util'

describe('utils-tests', () => {
  let rows = 3;
  let cols = 3;
  let squares = Array(rows*cols).fill(null);
  let winningCombos = calculateWinningCombos(rows,cols);
  
  it('compareMultiDimArrayContents works as expected - returns 0', () => {
    let myArray = [
      [1,1,1,1],
      [2,2,0,1]
    ]

    let targetArray = [
      [0,0,0,0],
      [0,0,1,0],
      [1,1,1,0],
      [1,1,0,1]
    ]
    let result = compareMultiDimArrayContents(targetArray, myArray);

    expect(0).toStrictEqual(result);
  });

  it('compareMultiDimArrayContents works as expected - returns 2', () => {
    let myArray = [
      [1,1,1,1],
      [2,2,0,1],
      [2,1,2,2]
    ]

    let targetArray = [
      [0,0,0,0],
      [0,0,1,0],
      [1,1,1,0],
      [1,1,0,1],
      [1,1,1,1],
      [2,2,0,1]
    ]
    let result = compareMultiDimArrayContents(targetArray, myArray);

    expect(2).toStrictEqual(result);
  });

  it('calculate and confirm all winning combos for a 3x3 grid', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
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
    let result = calculateWinningCombos(rows,cols);

    let foundResult = compareMultiDimArrayContents(result, lines);
    
    expect(result.length).toStrictEqual(lines.length);
    expect(foundResult).toStrictEqual(result.length);
  });

  it('calculate and confirm all winning combos for a 4x4 grid', () => {
    rows = 4;
    cols = 4;
    squares = Array(rows*cols).fill(null);
    const lines = [
      [0, 1, 2, 3],
      [4, 5,6,7],
      [8,9,10,11],
      [12,13,14,15],
      [0,4,8,12],
      [1,5,9,13],
      [2,6,10,14],
      [3,7,11,15],
      [0,5,10,15],
      [3,6,9,12]
    ];
    let result = calculateWinningCombos(rows,cols);

    let foundResult = compareMultiDimArrayContents(result, lines);
    
    expect(result.length).toStrictEqual(lines.length);
    expect(foundResult).toStrictEqual(result.length);
  });

  it('calculates no winner', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    winningCombos = calculateWinningCombos(rows,cols);
    
    expect(calculateWinner(squares,winningCombos)).toStrictEqual(null);
  });

  it('calculates X winner', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    winningCombos = calculateWinningCombos(rows,cols);
    squares[0] = 'X';
    squares[1] = 'X';
    squares[2] = 'X';

    expect(calculateWinner(squares, winningCombos)).toStrictEqual([0,1,2]);
  });

  it('calculates X winner', () => {
    rows = 4;
    cols = 4;
    squares = Array(rows*cols).fill(null);
    winningCombos = calculateWinningCombos(rows,cols);
    squares[0] = 'X';
    squares[1] = 'X';
    squares[2] = 'X';
    squares[3] = 'X';

    expect(calculateWinner(squares, winningCombos)).toStrictEqual([0,1,2,3]);
  });

  it('calculates X winner', () => {
    rows = 4;
    cols = 4;
    squares = Array(rows*cols).fill(null);
    winningCombos = calculateWinningCombos(rows,cols);
    squares[0] = 'X';
    squares[2] = 'X';
    squares[3] = 'X';

    expect(calculateWinner(squares, winningCombos)).toStrictEqual(null);
  });

  it('calculates O winner', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    winningCombos = calculateWinningCombos(rows,cols);
    squares[0] = 'O';
    squares[1] = 'O';
    squares[2] = 'O';

    expect(calculateWinner(squares, winningCombos)).toStrictEqual([0,1,2]);
  });

  it('says square 2 is on row 1', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    expect(getRow(rows,2)).toStrictEqual(1);
  });

  it('says square 5 is on row 2', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    expect(getRow(rows,5)).toStrictEqual(2);
  });

  it('says square 6 is on row 3', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    expect(getRow(rows,6)).toStrictEqual(3);
  });

  it('Says square 0 is in col 1', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    expect(getCol(cols,0)).toStrictEqual(1);
  });

  it('Says square 4 is in col 2', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    expect(getCol(cols,4)).toStrictEqual(2);
  });

  it('Says square 8 is in col 1', () => {
    rows = 3;
    cols = 3;
    squares = Array(rows*cols).fill(null);
    expect(getCol(cols,8)).toStrictEqual(3);
  });

});