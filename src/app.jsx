import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import {AuthState } from './login/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [winner, setWinner] = React.useState(null); // State to track the winner

  const handleWin = (newWinner) => {
    setWinner(newWinner);
  };

  return (
    <BrowserRouter>
      <div className = "body">
        <header>
          <h1>Sudoku Central</h1>
        </header>
        <div className="content">

          <aside id='whitespace'></aside>


          <Routes>
            <Route 
              path='/login' 
              element={<Login 
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setUserName(userName);
                  setAuthState(authState);
                }}
              />
              } 
              exact 
            />
            <Route path='/' element={<Play userName={userName} setWinner={handleWin} />} />
            <Route path='/scores' element={<Scores winner={winner} setWinner={handleWin}/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>


          <aside>
              <nav>
                <menu>
                  <li><NavLink id="home" to="">Home</NavLink></li>
                  {authState == AuthState.Unauthenticated && (
                    <li>
                      <NavLink id="login" to="login">
                        Log In/Sign Up
                      </NavLink>
                    </li>
                  )}
                  {authState == AuthState.Authenticated && (
                    <li>
                      <NavLink id="logout" to="login">
                      Log Out
                      </NavLink>
                    </li>
                  )}
                  {authState == AuthState.Authenticated && (
                    <li>
                      <NavLink id="score" to="scores">
                        Scores
                        </NavLink>
                    </li>
                  )}
                  {authState == AuthState.Authenticated && (
                    <li id='user'>
                      User: {userName}
                    </li>
                  )}
                  
                </menu>
              </nav>
          </aside>

        </div>

        <footer>
          <hr />
          <span>John Rowberry</span>
          <br />
          <NavLink to="https://github.com/lemlag/startup">
            GitHub
          </NavLink>
        </footer>

      </div>;
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}