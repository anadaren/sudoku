import React, { useState } from "react";
import './App.css'
import { Sudoku } from './Sudoku.jsx'

function App() {
  const [sudokuArr, setSudokuArr] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {// Title Card
        isVisible && <div className="title-screen h-screen w-screen flex justify-center align-center bg-[#BCE3B3]">
        <div className="title-container m-auto">
          <div className='title-text m-10 text-7xl'>Sudoku</div>
          <button className='bg-[#8FA88C] text-2xl text-[#BCE3B3]' onClick={handleClick}>NEW GAME</button>
        </div>
      </div>}


      {!isVisible && <div><Sudoku setSudokuArr={setSudokuArr} sudokuArr={sudokuArr} />

      <p className="text-xs right-auto m-5 text-[#0B0D14] sm:text-base">
      Made with 💚 by <a href="https://github.com/anadaren">anadaren</a>
      </p></div>}

    </>
  )
}

export default App
