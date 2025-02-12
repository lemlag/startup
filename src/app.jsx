import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    <header>
      <h1>Sudoku Central</h1>
    </header>

    <main> 
      <div>App components go here </div>

          {/* -- Navigation elements -- */}
    <aside>
        <nav>
          <menu>
            <li><a id="home" href="index.html">Home</a></li>
            <li><a id="score" href="scores.html">Scores</a></li>
            <li><a id="login" href="login.html">Log In/Sign Up</a></li>
            <li><a>User: Username</a></li>
          </menu>
        </nav>
    </aside>
    </main>



    <footer>
      <hr />
      <span>John Rowberry</span>
      <br />
      <a href="https://github.com/lemlag/startup">GitHub</a>
    </footer>

  </div>;
}