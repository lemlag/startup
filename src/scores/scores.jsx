import React from 'react';
import './scores.css'

export function Scores() {
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
          <tbody>
            <tr>
              <td className="rank">1</td>
              <td>Kim Kardashian</td>
              <td>01:32:22</td>
            </tr>
            <tr>
              <td>2</td>
              <td>George Clooney</td>
              <td>01:32:25</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Brittney Spears</td>
              <td>01:32:40</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Robin Williams</td>
              <td>02:12:40</td>
            </tr>
            <tr>
              <td>5</td>
              <td>The Genie</td>
              <td>02:32:40</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Brittney Spears</td>
              <td>03:32:40</td>
            </tr>
            <tr>
              <td>7</td>
              <td>King Kong</td>
              <td>03:33:40</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Paul Blart</td>
              <td>04:32:30</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Brittney Spears</td>
              <td>04:32:40</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Darth Vader</td>
              <td>05:32:40</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}