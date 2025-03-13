import React from 'react';



import './play.css';

export function Gameboard(props) {
  const userName = props.userName;
  const [sudoku, setSudoku] = React.useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [userData, setUserData] = React.useState(sudoku);
  const [readOnly, setReadOnly] = React.useState([]);
  const [sudSolution, setSudSolution] = React.useState(Array.from({ length: 9 }, () => Array(9).fill(0)));


  const [timer, setTime] = React.useState(new Date());
  const startTimeRef = React.useRef(Date.now());
  const intervalRef = React.useRef(null);

  const startTimer = () => {
    console.log("Start Time Ref: " ,startTimeRef.current);
    console.log("Time: " ,timer);
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
    console.log("Interval Ref: " ,intervalRef.current);

  };

  const resetTimer = () => { 
    clearInterval(intervalRef.current);
    console.log("Interval Ref: " ,intervalRef.current);
    // setTime(Date.now() - startTimeRef.current);
    // console.log("Interval Ref: " ,intervalRef.current);

    startTimer();
  }

  // Increment timer every second
  React.useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const [currentDate, setCurrentDate] = React.useState('');

  // Set the current date when the component mounts
  React.useEffect(() => {
    const today = new Date(startTimeRef.current);
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
  }, []);
    
  
    const formatTime = (milliseconds) => {
      const mins = Math.floor(milliseconds / 60000);
      const secs = Math.floor(milliseconds / 1000) % 60;
      const hours = Math.floor(mins / 60);
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
  
  React.useEffect(() => {
    const fetchSudokuData = async () => {
      try {
        await fetch('/api/sudoku/saves', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
          if(response.ok) 
            {return response.json()} 
          else if(response.status === 401){
            throw new Error('Not logged in, I suppose')
          }
          else if(response.status === 404)
            {throw new Error('No Saved Game')}
          else
            {throw new Error('Other error')}
        }).then((game) => {
          setSudoku(game.sudoku);
          setSudSolution(game.solution);
          console.log("For TA Graders:", game.solution);
          setUserData(game.userData);
          startTimeRef.current = game.startTime;
          console.log("STR:", startTimeRef.current);
          resetTimer();
          const initialReadOnly = game.sudoku.map(row =>
            row.map(cell => cell !== 0)
          );
          setReadOnly(initialReadOnly);
        })
        .catch(error => {
          newGame();
          console.error('Failed to fetch sudoku data', error);
        });


      } catch (error) {
        console.error('Failed to fetch sudoku data', error);
      }
    };

    fetchSudokuData();
  }, []);

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
    var newBoard;
    var newBoardSolution;
    await fetch('https://sudoku-api.vercel.app/api/dosuku')
      .then((response) => response.json())
      .then((data) => {
        const board = data.newboard.grids[0]
        newBoard = board.value;
        newBoardSolution = board.solution;
        setSudoku(board.value);
        setSudSolution(board.solution);
        console.log("For TA Graders:", board.solution);
        setUserData(board.value);
        const initialReadOnly = board.value.map(row =>
          row.map(cell => cell !== 0)
        );
        setReadOnly(initialReadOnly);
        startTimeRef.current = Date.now();
        console.log("sTr:", startTimeRef.current);
        console.log(startTimeRef.current);
        resetTimer();
      })
      .catch();

    await fetch('/api/sudoku/newGame', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({email: userName, sudoku: newBoard, solution: newBoardSolution})
    })
      .catch(error =>{
        startTimeRef.current = Date.now();
        resetTimer();
        console.error('Not logged in, I suppose', error);
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
    alert("Correct Solution: all cells are correct");
  }
  else {
    alert("Incorrect Solution: " + score + " " + "cells are correct");
  }
};

const solve = () => {
  const newSudoku = sudSolution;
  setUserData(newSudoku);
  const initialReadOnly = newSudoku.map(row =>
    row.map(cell => cell !== 0)
  );
  setReadOnly(initialReadOnly);
}


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
      <button type="button" className="btn btn-primary" onClick={solve}>SOLVE (testing only)</button>
    </section>
  );
}