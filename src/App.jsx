import { useState } from 'react'
import './App.css'
import { Sudoku } from './Sudoku.jsx'


function App() {
  return (
    <>
    <div className="App-header">
      <h1 className="title">Sudoku</h1>
      
      <Sudoku/>

      <p className="credits">
      ©2024 Built and Designed by <a href="https://github.com/anadaren">Anastasia Green</a>
      </p>
    </div>
    </>
  )
}

export default App
