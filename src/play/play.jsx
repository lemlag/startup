import React, { useEffect } from 'react';

// import { Players } from './players';
import { Gameboard } from './gameboard';
import './play.css';

export function Play(props) {
  
  return (
    <main>
      <Gameboard userName={props.userName}/>
    </main>
  );
}