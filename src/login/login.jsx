import React from 'react';
import './login.css'

export function Login() {
  return (
    <main>

    <section class="signup">

      <img id="lock" src="./Lock.jpg" alt="Lock icon"/>

      <form method="get" action="/">
          <div>
            <span>Username:</span>
            <input type="text" placeholder="username" />
          </div>
          <div>
            <span>Password:</span>
            <input type="password" placeholder="password" />
          </div>
          <div>
          <button type="submit">Login</button>
          <button type="submit">Create</button>
          </div>
      </form>

    </section>
    </main>
  );
}