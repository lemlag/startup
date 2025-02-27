import React from 'react';
import './login.css'

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main>
      <section className='signup'>
        {authState !== AuthState.Unknown && <h1>Welcome to SudokuCentral</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </section>
    </main>
  );
}





//     <main>

//     <section class="signup">

//       <img id="lock" src="./Lock.jpg" alt="Lock icon"/>

//       <form method="get" action="/">
//           <div>
//             <span>Username:</span>
//             <input type="text" placeholder="username" />
//           </div>
//           <div>
//             <span>Password:</span>
//             <input type="password" placeholder="password" />
//           </div>
//           <div>
//           <button type="submit">Login</button>
//           <button type="submit">Create</button>
//           </div>
//       </form>

//     </section>
//     </main>
//   );
// }