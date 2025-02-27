import React from 'react';

// import { Players } from './players';
// import { SudokuGame } from './sudokuGame';
import './play.css';

export function Gameboard() {
  const [sudoku, setSudoku] = React.useState([]);
  const [timer, setTimer] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState('');

  // Load Sudoku from local storage
  React.useEffect(() => {
    const sudokuText = localStorage.getItem('sudoku');
    if (sudokuText) {
      setSudoku(JSON.parse(sudokuText));
    }
  }, []);

  // Increment timer every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Set the current date when the component mounts
  React.useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleChange = (e, index) => {
    const input = e.target.value;
    const newValue = input.replace(/[^1-9]/g, '').slice(0, 1);
    const newSudoku = [...sudoku];
    newSudoku[index] = newValue;
    setSudoku(newSudoku);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const sudokuRows = [];
  for (let i = 0; i < 81; i += 9) {
    sudokuRows.push(
      <tr key={i}>
        {Array(9).fill(0).map((_, j) => {
          const index = i + j;
          const setClass = `block${Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3)}`;
          return (
            <td key={index} className={setClass}>
              <input
                type="number"
                value={sudoku[index]}
                onChange={(e) => handleChange(e, index)}
              />
            </td>
          );
        })}
       </tr>
    );
  }



  return (
    <section id="puzzle">
        <table class="centered">
          {sudokuRows}
        </table>
        <br/>
        <button type="button" class="btn btn-primary">SUBMIT</button>
      </section>
  );
}