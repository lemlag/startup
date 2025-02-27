import React from 'react';



import './play.css';

export function Gameboard(props) {
  const userName = props.userName;
  const [sudoku, setSudoku] = React.useState([[6,9,8,2,5,7,1,3,4],
    [5,4,2,3,6,1,9,8,7],
    [7,1,3,9,4,8,6,5,2],
    [9,5,4,7,8,2,3,1,6],
    [2,8,6,4,1,3,7,9,5],
    [3,7,1,5,9,6,2,4,8],
    [8,2,9,6,3,4,5,7,1],
    [1,3,7,8,2,5,4,6,9],
    [0,6,5,1,0,9,0,0,0]]);

  const [readOnly, setReadOnly] = React.useState([]);
  const [sudSolution, setSudSolution] = React.useState([[6,9,8,2,5,7,1,3,4],
    [5,4,2,3,6,1,9,8,7],
    [7,1,3,9,4,8,6,5,2],
    [9,5,4,7,8,2,3,1,6],
    [2,8,6,4,1,3,7,9,5],
    [3,7,1,5,9,6,2,4,8],
    [8,2,9,6,3,4,5,7,1],
    [1,3,7,8,2,5,4,6,9],
    [4,6,5,1,7,9,8,2,3]])


    const [timer, setTimer] = React.useState(0);
    const [currentDate, setCurrentDate] = React.useState('');
  
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
    
  
      const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        };
  


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

  async function saveScore(time) {
    const newScore = { name: userName, time: time, formatted: formatTime(time) }; 
    props.setWinner(newScore);
    updateScoresLocal(newScore);
  }



  function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.time < prevScore.time) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
  }


const onSubmit = () => {
  let score = 0;
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      if (sudoku[i][j] === sudSolution[i][j]) {
        score += 1;
      } else{
        if (sudoku[i][j] - sudSolution[i][j] === 0) {
          score += 1;
        }
      }
    }
  }
  if (score === 81) {
  saveScore(timer);
  }
  else {
    alert("Incorrect Solution" + " " + score + " " + "cells are correct");
  }
};


  return (
    <section id="puzzle">
          <div>
          <h2>
          <label htmlFor="timer">Time:   </label>
          <input type="text" id="timer" value={formatTime(timer)} readOnly />
        </h2>
        <h3>
          Daily Puzzle: {currentDate}
        </h3>
        </div>
      <table className="centered">
        <tbody>{sudokuRows}</tbody>
      </table>
      <br />
      <button type="button" className="btn btn-primary" onClick={onSubmit}>SUBMIT</button>
    </section>
  );
}