import { useState } from 'react'
import './App.css'
import './Sudoku.js'

let current = [
  [0, 5, 0, 9, 0, 0, 0, 0, 0],
  [8, 0, 0, 0, 4, 0, 3, 0, 7],
  [0, 0, 0, 2, 8, 0, 1, 9, 0],
  [5, 3, 8, 6, 0, 7, 9, 4, 0],
  [0, 2, 0, 3, 0, 1, 0, 0, 0],
  [1, 0, 9, 8, 0, 4, 6, 2, 3],
  [9, 0, 7, 4, 0, 0, 0, 0, 0],
  [0, 4, 5, 0, 0, 0, 2, 0, 9],
  [0, 0, 0, 0, 3, 0, 0, 7, 0],
];

let initial = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];


function App() {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) || 0, grid = getDeepCopy(sudokuArr);
    // input value should range from 1-9 and for empty cell it should be -1
    if(val === 0 || val >= 1 && val <= 9) {
      grid[row][col] = val;
    }
    setSudokuArr(grid);
  }

  // function to check sudoku is valid or not
  function checkSudoku() {
    let sudoku = getDeepCopy(current);
    solver(sudoku);
    let compare = compareSudokus(sudokuArr, sudoku);
    if(compare.isComplete) {
      alert("Sudoku solved!")
    } else if(compare.isSolvable) {
      alert("Good so far. Keep going!");
    } else {
      alert("Sudoku can't be solved. Try again!");
    }
  }

  // function to solve current sudoku puzzle
  function solveSudoku() {
    let sudoku = getDeepCopy(current);
    solver(sudoku);
    setSudokuArr(sudoku);
  }

  // function to reset current sudoku puzzle
  function resetSudoku() {
    let sudoku = getDeepCopy(current); // TODO: change from initial to current
    setSudokuArr(sudoku);
  }

  // function to generate new sudoku puzzle
  function newSudoku() {
    let sudoku = current;//generateSudoku();
    setSudokuArr(sudoku);
  }

  function compareSudokus(currentSudoku, solvedSudoku) {
    let resolution = {
      isComplete: true,
      isSolvable: true
    }
    for(var i=0; i<9; i++) {
      for(var j=0; j<9; j++) {
        if(currentSudoku[i][j] != solvedSudoku[i][j]) {
          if(currentSudoku[i][j] != 0) {
            resolution.isSolvable = false;
          }
          resolution.isComplete = false;
        }
      }
    }
    return resolution;
  }

  // sudoku solver logic
  function solver(grid, row=0, col=0) {
    if(grid[row][col] !== 0) {
      let isLast = row >= 8 && col >= 8;
      if(!isLast){
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol);
      }
    }

    for(let i=0; i<=9; i++){
      if(isValid(grid, row, col, i)) {
        grid[row][col] = i;
        let [newRow, newCol] = getNext(row, col);

        if(!newRow && !newCol) {
          return true;
        }
        if(solver(grid, newRow, newCol)) {
          return true;
        }
      }
    }
    grid[row][col] = 0;
    return false;
  }

  function getNext(row, col) {
    return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0,0];
  }

  // checks if sudoku cell is valid or not
  function isValid(grid, row, col, value) {
    if(checkRow(grid, row, value) && checkCol(grid, col, value) && checkBox(grid, row, col, value)) {
      return true;
    }
    return false;
  }

  function checkRow(grid, row, value) {
    return grid[row].indexOf(value) === -1;
  }

  function checkCol(grid, col, value) {
    return grid.map(row => row[col]).indexOf(value) === -1;
  }

  function checkBox(grid, row, col, value) {
    let boxArr = [],
    rowStart = row - (row%3),
    colStart = col - (col%3);
    // Iterates through board
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
      boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(value) === -1;
  }

  return (
    <>
    <div className="App-header">
      <h1 className="title">Sudoku</h1>
      <table>
        <tbody>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return <tr key={rIndex} className={(row + 1) % 3 === 0 ? "bBorder" : ""}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                  return <td key={rIndex + cIndex} className={(col + 1) % 3 === 0 ? "rBorder" : ""}>
                    <input onChange={(e) => onInputChange(e, row, col)}
                    value={sudokuArr[row][col] === 0 ? '' : sudokuArr[row][col]}
                    className="cellInput"
                    disabled={initial[row][col] !== 0}/>
                  </td>
                })}
                </tr>
            })
          }
        </tbody>
      </table>

      <div className="buttonContainer">
        <button className="checkButton" onClick={checkSudoku}>
          Check
        </button>
        <button className="solveButton" onClick={solveSudoku}>
          Solve
        </button>
        <button className="resetButton" onClick={resetSudoku}>
          Reset
        </button>
        <button className="newButton" onClick={newSudoku}>
          New Game
        </button>
      </div>

      <p className="credits">
      ©2024 Built and Designed by Anastasia Green
      </p>
    </div>
    </>
  )
}

export default App
