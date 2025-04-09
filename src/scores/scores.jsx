import React from 'react';
import './scores.css'
import { GameEvent, ScoreClientInstance } from '../play/scoreClient';

export function Scores(props) {
  const [scores, setScores] = React.useState([]);
  const [events, setEvent] = React.useState([]);

  // Load scores at the beginning only (when it is rendered) - but maybe also load it when someone else wins
  React.useEffect(() => {
    fetch('/api/times')
      .then((response) => response.json())
      .then((times) => {
        setScores(times);
        console.log('Fetched times:', times);
      });
  }, []);

  React.useEffect(() => {
    ScoreClientInstance.addObserver(handleGameEvent);
    return () => {
      ScoreClientInstance.removeObserver(handleGameEvent);
    };
  });

  function handleGameEvent(event) {
    if (event.data === undefined) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
      const text = event.target.result;
      const parsedData = JSON.parse(text);
      console.log('Parsed data:', parsedData);
      handleParsedData(parsedData);
    };

    function handleParsedData(parsedData) {
      const time = parsedData.value;
      console.log('Received time:', time);
      console.log('Scores:', scores);
      if (scores.length === 0) {
        setScores([time]);
        return;
      }

      for (const [i, score] of scores.entries()) {
        if (score.time < time.time) {
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
    reader.readAsText(event.data);
    console.log('Received time:', time);
  }

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