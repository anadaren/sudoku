import { useState } from 'react'
import './App.css'
import './Sudoku.js'

// Initial Board, all 0s
let initial = Array.from({ length: 9 }, () => Array(9).fill(0));

// Current board being displayed
let current = Array.from({ length: 9 }, () => Array(9).fill(0));

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
    let sudoku = getDeepCopy(current);
    setSudokuArr(sudoku);
  }

  // function to generate new sudoku puzzle
  function newSudoku() {
    let sudoku = getDeepCopy(generateSudoku());
    current = sudoku;
    setSudokuArr(current);
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

  function generateSudoku() {
    // Generates empty grid, then solves it with random numbers
    let sudoku = Array.from({ length: 9 }, () => Array(9).fill(0));
    solver(sudoku);

    // Deletes some elements from solved puzzle, based on difficulty level
    let difficultyFactor = 0.2;     // TODO: set range from 0.3 to 0.

    for(let i=0; i<9; i++) {
      for(let j=0; j<9; j++) {
        if(Math.random() > difficultyFactor) sudoku[i][j] = 0;
      }
    }

    return sudoku;
  }

  // sudoku solver logic
  function solver(grid, row=0, col=0) {
    for (row = 0; row < 9; row++) {
      for (col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
              // Try all numbers from 1 to 9
              const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
              for (let num of nums) {
                  if (isValid(grid, row, col, num)) {
                      grid[row][col] = num;
                      if (solver(grid)) {
                          return true;
                      }
                      grid[row][col] = 0; // Backtrack
                  }
              }
              return false; // No valid number found
          }
      }
  }
  return true; // Board is complete
  }

  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        // Check row
        if (board[row][i] === num) return false;

        // Check column
        if (board[i][col] === num) return false;

        // Check 3x3 grid
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + i % 3;
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  }

  // Helper function to shuffle an array (Fisher-Yates shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

export default App;
