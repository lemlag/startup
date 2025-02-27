import React from 'react';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('password', password);
    props.onLogin(userName);
  }

  return (
    <section class="signup">
      <img id="lock" src="./Lock.jpg" alt="Lock icon"/>
      <div>
        <span>
          Username:
        </span>
        <input type="text" value="userName" onChange={(e) => setUserName(e.target.value)} placeholder="username@email.com" />
      </div>
      <div>
        <span>
          Password:
        </span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      </div>
      <div>
        <button onClick={() => loginUser()} disabled={!userName || !password}>
          Login
        </button>
        <button onClick={() => createUser()} disabled={!userName || !password}>
          Create
        </button>
      </div>
      
      {/* <MessageDialog message={displayError} onHide={() => setDisplayError(null)} /> */}
    </section>
  );
}

