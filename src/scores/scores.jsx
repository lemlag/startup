import React from 'react';
import './scores.css'

export function Scores(props) {
  const [scores, setScores] = React.useState([]);
  const winner = props.winner;

  // Load scores at the beginning only (when it is rendered) - but maybe also load it when someone else wins
  React.useEffect(() => {
    fetch('/api/times')
      .then((response) => response.json())
      .then((times) => {
        setScores(times);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/times')
      .then((response) => response.json())
      .then((times) => {
        setScores(times);
      });
  }, [winner]);

  function updateScores(newScore) {
    props.setWinner(newScore)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Fix demonstration for websocket functionality
  setInterval(() => {
    const thisTime = Math.floor(Math.random() * 4000);
    const newScore = { name: `User-${Math.floor(Math.random() * 100)}`, time: thisTime, formatted: formatTime(thisTime) };
    fetch('/api/sudoku/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newScore),
    })
    updateScores(newScore);
  }, 100000);

  const scoreRows = [];
  if(scores.length) {
    for (const [i, score] of scores.slice(0,10).entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.formatted}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='3'>No daily winners yet</td>
      </tr>
    );
  }

  return (
    <main>
      <section className="Leaderboard">
        <table className="centered leader">
          <thead>
            <tr>
              <th className="rank">Rank</th>
              <th className="username">Username</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody id='scores'>{scoreRows}</tbody>
        </table>
      </section>
    </main>
  );
}