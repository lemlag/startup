import React from 'react';

// import { Players } from './players';
import { Gameboard } from './gameboard';
import { Peripherals } from './peripherals';
import './play.css';

export function Play() {
  return (
    <main>
      <Peripherals />
      <Gameboard />
    </main>
  );
}