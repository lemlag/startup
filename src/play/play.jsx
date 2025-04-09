import React, { useEffect } from 'react';

import { Gameboard } from './gameboard';
import './play.css';

export function Play(props) {
  
  return (
    <main>
      <Gameboard userName={props.userName}/>
    </main>
  );
}