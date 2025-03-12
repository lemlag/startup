import React from 'react';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      alert("Incorrect username or password: " + body.msg);
    }
  }

  return (
    <section className="signup">
      <img id="lock" src="./Lock.jpg" alt="Lock icon"/>
      <div>
        <span>
          Username:
        </span>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="username@email.com" />
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
      
    </section>
  );
}

