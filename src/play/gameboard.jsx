import React from 'react';



import './play.css';

export function Gameboard(props) {
  const userName = props.userName;
  const [sudoku, setSudoku] = React.useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [userData, setUserData] = React.useState(sudoku);
  const [readOnly, setReadOnly] = React.useState([]);
  const [sudSolution, setSudSolution] = React.useState(Array.from({ length: 9 }, () => Array(9).fill(0)));


  const [time, setTime] = React.useState(new Date());
  const startTimeRef = React.useRef(Date.now());

  // Increment timer every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [currentDate, setCurrentDate] = React.useState('');

  // Set the current date when the component mounts
  React.useEffect(() => {
    const today = startTimeRef.current;
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
    const fetchSudokuData = async () => {
      try {
        const response = await fetch('/api/sudoku/saves', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email: userName})
        });
    
        if (response.ok){
          const game = await response.json();
          setSudoku(game.sudoku);
          setSudSolution(game.solution);
          setUserData(game.userData);
          startTimeRef.current = game.startTime;
        } else {
          await newGame();
        }

        const initialReadOnly = sudoku.map(row =>
          row.map(cell => cell !== 0)
        );
        setReadOnly(initialReadOnly);
      } catch (error) {
        console.error('Failed to fetch sudoku data', error);
      }
    };

    fetchSudokuData();
  }, []);

  // React.useEffect(() => {
  //   const saveSudokuData = async () => {
  //     try {
  //       await fetch('/api/sudoku/save', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({email: userName, userData: userData})
  //       });
  //     } catch (error) {
  //       console.error('Failed to save sudoku data', error);
  //     }
  //   };

  //   saveSudokuData();
  // }, [userData]);

  const handleChange = (e, rowIndex, colIndex) => {
    const input = e.target.value;
    const newValue = input.replace(/[^1-9]/g, '').slice(0, 1);
    const newSudoku = [...userData];
    newSudoku[rowIndex][colIndex] = newValue;
    setUserData(newSudoku);
  }

  const sudokuRows = [];
  for (let rowIndex = 0; rowIndex < userData.length; rowIndex++) {
    sudokuRows.push(
      <tr key={rowIndex}>
        {userData[rowIndex].map((cell, colIndex) => {
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


  async function submit(time) {
    const newScore = { name: userName, time: time, formatted: formatTime(time) };
    await fetch('/api/sudoku/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newScore),
    });

    props.setWinner(newScore);
  }

  async function newGame() {
    await fetch('https://sudoku-api.vercel.app/api/dosuku')
      .then((response) => response.json())
      .then((data) => {
        const board = data.grid
        setSudoku(board.value);
        setSudSolution(board.solution);
        setUserData(board.value);
        const initialReadOnly = board.value.map(row =>
          row.map(cell => cell !== 0)
        );
        setReadOnly(initialReadOnly);
      })
      .catch();

    await fetch('/api/sudoku/newGame', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({email: userName, sudoku: sudoku, solution: sudSolution})
    }).then((response) => response.json())
      .then((startTime) => {
        startTimeRef.current = startTime;
      });
  }


  async function saveGame() {
    await fetch('/api/sudoku/saves', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({email: userName, userData: userData})
    });
  }


const onSubmit = () => {
  let score = 0;
  for (let i = 0; i < userData.length; i++) {
    for (let j = 0; j < userData[i].length; j++) {
      if (userData[i][j] === sudSolution[i][j]) {
        score += 1;
      } else{
        if (userData[i][j] - sudSolution[i][j] === 0) {
          score += 1;
        }
      }
    }
  }
  if (score === 81) {
    submit(timer);
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
      <button type="button" className="btn btn-primary" onClick={saveGame}>SAVE</button>
      <button type="button" className="btn btn-primary" onClick={newGame}>NEW GAME</button>
    </section>
  );
}