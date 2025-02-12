import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';

export default function App() {
  return (
  <BrowserRouter>
  <div className="body bg-dark text-light">
    <header>
      <h1>Sudoku Central</h1>
    </header>

  <Routes>
    <Route path='/login' element={<Login />} exact />
    <Route path='/' element={<Play />} />
    <Route path='/scores' element={<Scores />} />
    <Route path='*' element={<NotFound />} />
  </Routes>

    {/* <main> 
      <div>App components go here </div>

          {/* -- Navigation elements -- */}
    <aside>
        <nav>
          <menu>
            <li><NavLink id="home" to="">Home</NavLink></li>
            <li><NavLink id="score" to="scores">Scores</NavLink></li>
            <li><NavLink id="login" to="login">Log In/Sign Up</NavLink></li>
            <li>User: Username</li>
          </menu>
        </nav>
    </aside>
    {/* </main> */}



    <footer>
      <hr />
      <span>John Rowberry</span>
      <br />
      <NavLink to="https://github.com/lemlag/startup">GitHub</NavLink>
    </footer>

  </div>;
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}