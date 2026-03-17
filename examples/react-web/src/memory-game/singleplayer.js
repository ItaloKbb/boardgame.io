import React from 'react';
import { Client } from 'boardgame.io/react';
import { Debug } from 'boardgame.io/debug';
import MemoryGame from './game';
import Board from './board';

const App = Client({
  game: MemoryGame,
  board: Board,
  debug: { impl: Debug },
});

const Singleplayer = () => (
  <div style={{ padding: '20px' }}>
    <App playerID="0" />
  </div>
);

export default Singleplayer;
