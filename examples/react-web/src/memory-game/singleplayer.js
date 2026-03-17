/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import MemoryGame from './game';
import MemoryBoard from './board';

const App = Client({
  game: MemoryGame,
  board: MemoryBoard,
  numPlayers: 2,
});

const Singleplayer = () => (
  <div>
    <h1>Memory Game - Singleplayer</h1>
    <p>
      Play against yourself! Flip two cards at a time to find matching pairs.
      Match all pairs to win!
    </p>
    <div className="runner">
      <div className="run">
        <App />
      </div>
    </div>
  </div>
);

export default Singleplayer;
