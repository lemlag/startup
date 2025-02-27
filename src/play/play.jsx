import React from 'react';

// import { Players } from './players';
// import { SudokuGame } from './sudokuGame';

export function Play() {
  const [sudoku, setSudoku] = React.useState([]);

  sudokuRows = [];
  for (let i = 0; i < 81; i += 9) {
    set1 = i / 3;
    set2 = i / 3 + 1;
    set3 = i / 3 + 2;
    sudokuRows.push(
      <tr key={i}>
        <td class={"block" + set1}>
          <input type="number" value={sudoku[i]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set1}>
          <input type="number" value={sudoku[i+1]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set1}>
          <input type="number" value={sudoku[i+2]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set2}>
          <input type="number" value={sudoku[i+3]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set2}>
          <input type="number" value={sudoku[i+4]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set2}>
          <input type="number" value={sudoku[i+5]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set3}>
          <input type="number" value={sudoku[i+6]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set3}>
          <input type="number" value={sudoku[i+7]} onchange={handleChange}/> 
        </td>
        <td class={"block" + set3}>
          <input type="number" value={sudoku[i+8]} onchange={handleChange}/> 
        </td>
      </tr>
    );
  }

  const handleChange = (e, index) => {
    const input = e.target.value;
    const newValue = input.replace(/[^1-9]/g, '').slice(0, 1);
    const newSudoku = [...sudoku];
    newSudoku[index] = newValue;
    setSudoku(newSudoku);
  };

  return (
    <main>
    <section id="puzzle">
        <h2>
          <label for="timer">Time:</label>
          <input type="time" id="timer" value="--" readonly />
        </h2>
        <h3>
          Puzzle # XXXXXX
        </h3>

        <table class="centered">
          {sudokuRows}
        </table>
        <br/>
        <button type="button" class="btn btn-primary">SUBMIT</button>
      </section>
    </main>
  );
}