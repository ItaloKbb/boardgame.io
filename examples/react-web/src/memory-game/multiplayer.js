/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import MemoryGame from './game';
import MemoryBoard from './board';

const App = Client({
  game: MemoryGame,
  board: MemoryBoard,
  multiplayer: Local(),
});

const Multiplayer = () => (
  <div>
    <h1>Memory Game - Multiplayer</h1>
    <p>
      Players take turns flipping two cards. If the cards match, the player
      scores a point and goes again. The player with the most matches wins!
    </p>
    <div className="runner" style={{ maxWidth: '100%' }}>
      <div className="run" style={{ display: 'inline-block', margin: '10px' }}>
        <App matchID="memory-multi" playerID="0" />
      </div>
      <div className="run" style={{ display: 'inline-block', margin: '10px' }}>
        <App matchID="memory-multi" playerID="1" />
      </div>
    </div>
  </div>
);

export default Multiplayer;
