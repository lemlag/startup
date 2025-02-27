import React from 'react';

// import { Players } from './players';
// import { SudokuGame } from './sudokuGame';
import './play.css';

export function Gameboard() {
  const [sudoku, setSudoku] = React.useState([[0,0,0,2,0,7,1,3,0],
    [5,4,0,0,6,0,0,8,0],
    [0,1,0,9,0,0,0,5,2],
    [9,5,0,0,8,2,0,0,6],
    [0,0,6,0,0,0,7,0,0],
    [3,0,0,5,9,0,0,4,8],
    [8,2,0,0,0,4,0,7,0],
    [0,3,0,0,2,0,0,6,9],
    [0,6,5,1,0,9,0,0,0]]);

  const [readOnly, setReadOnly] = React.useState([]);

  React.useEffect(() => {
    const sudokuText = localStorage.getItem('sudoku');
    if (sudokuText) {
      setSudoku(JSON.parse(sudokuText));
    } else {
      localStorage.setItem('sudoku', JSON.stringify(sudoku));
    }

    const initialReadOnly = sudoku.map(row =>
      row.map(cell => cell !== 0)
    );
    setReadOnly(initialReadOnly);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('sudoku', JSON.stringify(sudoku));
  }, [sudoku]);

  const handleChange = (e, rowIndex, colIndex) => {
    const input = e.target.value;
    const newValue = input.replace(/[^1-9]/g, '').slice(0, 1);
    const newSudoku = [...sudoku];
    newSudoku[rowIndex][colIndex] = newValue;
    setSudoku(newSudoku);
  }

  const sudokuRows = [];
  for (let rowIndex = 0; rowIndex < sudoku.length; rowIndex++) {
    sudokuRows.push(
      <tr key={rowIndex}>
        {sudoku[rowIndex].map((cell, colIndex) => {
          const setClass = `block${Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3)}`;
          return (
            <td key={colIndex} className={setClass}>
              <input
                type="number"
                value={cell !== 0 ? cell : ''}
                readOnly={readOnly[rowIndex] && readOnly[rowIndex][colIndex]}
                onChange={(e) => handleChange(e, rowIndex, colIndex)}
              />
            </td>
          );
        })}
      </tr>
    );
  }



  return (
    <section id="puzzle">
      <table className="centered">
        <tbody>{sudokuRows}</tbody>
      </table>
      <br />
      <button type="button" className="btn btn-primary">SUBMIT</button>
    </section>
  );
}