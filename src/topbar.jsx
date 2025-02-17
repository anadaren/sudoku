import React from "react";


export const TopBar = ({ checkSudoku, solveSudoku, resetSudoku, newSudoku }) => {

    return (
        <>
            <h1 className="title text-3xl mt-2 mb-0 text-[#0B0D14]">Sudoku</h1>

            <div className="buttonContainer m-3 text-[#242C37]">
                <button className="mt-2 p-1 leading-3 bg-[#8FA88C]" onClick={newSudoku}>
                    <p className='m-0 text-lg'>New Game</p>
                </button>
                <button className="mt-2 p-1 leading-3 bg-[#8FA88C]" onClick={solveSudoku}>
                    <p className='m-0 text-lg'>Solve</p>
                </button>
                <button className="mt-2 p-1 leading-3 bg-[#8FA88C]" onClick={resetSudoku}>
                    <p className='m-0 text-lg'>Reset</p>
                </button>
                <button className="mt-2 p-1 leading-3 bg-[#8FA88C]" onClick={checkSudoku}>
                    <p className='m-0 text-lg'>Check</p>
                </button>
            </div>
        </>
    );
};