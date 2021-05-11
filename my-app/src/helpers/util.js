
export function calculateWinningCombos(rows,cols) {
  let winningCombos = [];
  let horizontalLines = [];
  let verticalLines = [];
  let diagonalLines = [];
  
  for (let i = 0; i < rows; i++) {
    let horizontalLine = [];
    for (let y=0; y< cols; y++) {
      horizontalLine.push((i*rows)+y);
    }
    horizontalLines.push(horizontalLine);
  }

  for (let i = 0; i < cols; i++) {
    let verticalLine = [];
    for (let y=0; y< rows; y++) {
      verticalLine.push((y*cols)+i);
    }
    verticalLines.push(verticalLine);
  }

  let diagonalLeftToRightLine = [];
  for (let i = 0; i < rows; i++) {
    diagonalLeftToRightLine.push((rows*i)+i);
  }
  diagonalLines.push(diagonalLeftToRightLine);

  let diagonalRightToLeftLine = [];
  for (let i = 0; i < rows; i++) {
    diagonalRightToLeftLine.push(((rows-1)*i)+(rows-1));
  }
  diagonalLines.push(diagonalRightToLeftLine);
  
  winningCombos = horizontalLines.concat(verticalLines, diagonalLines);

  return winningCombos;
}

export function calculateWinner(squares, winningCombos) {
  
  for (let i = 0; i < winningCombos.length; i++) {
    let line = winningCombos[i];
    let winnerFound = false;
    for (let x = 0; x < (line.length -1); x++) {
      if (squares[line[x]] && squares[line[x]] === squares[line[x+1]]) {
        winnerFound = true;
        continue;
      }
      winnerFound = false;
      break;
    }
    if (winnerFound) {
      return line;
    }
  }
  return null;
}

export function getRow(rows,i) {
  for(let n = 0; n < rows; n++) {
    let row = (i-rows*n) < rows ? n+1 : null
    if (row != null) {
      return row;
    }
  }
  return null;
}

export function getCol(cols,i) {
  return (i % cols) + 1
}

export function compareMultiDimArrayContents(targetArray, yourArray) {
  let foundResult = 0;
  yourArray.forEach((line) => {
    
    let foundFlag;
    for ( let x = 0; x < targetArray.length; x++) {
      foundFlag = false;
      
      for(let i = 0; i < targetArray[x].length; i++) {
        if (targetArray[x][i] === line[i]) {
          foundFlag = true;
        }
        else {
          foundFlag = false;
          break;
        }
      }
      if (foundFlag === true) {
        break;
      }
    }
    if (foundFlag === true) {
      foundResult++;
    }
  });
  return foundResult;
}