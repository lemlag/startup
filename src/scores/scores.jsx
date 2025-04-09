import React from 'react';
import './scores.css'
import { GameEvent, ScoreClient } from '../play/scoreClient';

export function Scores(props) {
  const [scores, setScores] = React.useState([]);
  const [events, setEvent] = React.useState([]);

  // Load scores at the beginning only (when it is rendered) - but maybe also load it when someone else wins
  React.useEffect(() => {
    fetch('/api/times')
      .then((response) => response.json())
      .then((times) => {
        setScores(times);
      });
  }, []);

  React.useEffect(() => {
    ScoreClient.addObserver(handleGameEvent);
    return () => {
      ScoreClient.removeObserver(handleGameEvent);
    };
  });

  function handleGameEvent(event) {
    const time = event.value;
    for (const [i, score] of scores.entries()) {
      if (score.time < time.time) {
        time.formatted = formatTime(time.time);
        scores[i] = time;
        scores.splice(i, 0, time);
        if (scores.length > 10) {
          scores.pop();
        }
        setScores([...scores]);
        return;
      }
    }
  }

  const formatTime = (milliseconds) => {
    const secs = Math.floor(milliseconds / 1000) % 60;
    const mins = Math.floor(milliseconds / 60000) % 60;
    const hours = Math.floor(milliseconds / 360000);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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