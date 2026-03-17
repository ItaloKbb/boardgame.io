/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

class MemoryBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
  };

  onCardClick = (cardIndex) => {
    const { G, isActive, playerID, ctx } = this.props;

    // Only allow clicking if it's your turn
    if (!isActive) {
      return;
    }

    // Don't allow clicking if 2 cards are already flipped
    if (G.flipped.length >= 2) {
      return;
    }

    // Don't allow clicking matched cards
    if (G.cards[cardIndex].matched) {
      return;
    }

    // Don't allow clicking same card twice
    if (G.flipped.includes(cardIndex)) {
      return;
    }

    this.props.moves.flipCard(cardIndex);
  };

  renderCard(card, index) {
    const { G } = this.props;
    const isFlipped = G.flipped.includes(index) || card.matched;
    const isMatched = card.matched;

    return (
      <div
        key={card.id}
        className={`memory-card ${isFlipped ? 'flipped' : ''} ${
          isMatched ? 'matched' : ''
        }`}
        onClick={() => this.onCardClick(index)}
      >
        <div className="card-inner">
          <div className="card-front">?</div>
          <div className="card-back">{card.symbol}</div>
        </div>
      </div>
    );
  }

  render() {
    const { G, ctx, playerID, isMultiplayer, isConnected } = this.props;

    let disconnected = null;
    if (isMultiplayer && !isConnected) {
      disconnected = <div className="status-message">Disconnected!</div>;
    }

    let gameStatus = null;
    if (ctx.gameover) {
      if (ctx.gameover.draw) {
        gameStatus = (
          <div className="game-over">
            <h2>It's a Draw!</h2>
            <p>Winners: {ctx.gameover.winners.join(', ')}</p>
          </div>
        );
      } else {
        gameStatus = (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Winner: Player {ctx.gameover.winner}</p>
          </div>
        );
      }
    }

    const currentPlayerIndicator = (
      <div className="current-turn">
        <strong>Current Turn:</strong> Player {ctx.currentPlayer}
        {playerID && ctx.currentPlayer === playerID && (
          <span className="your-turn"> (Your Turn!)</span>
        )}
      </div>
    );

    const scores = (
      <div className="scores">
        <h3>Scores:</h3>
        {Object.entries(G.scores).map(([pid, score]) => (
          <div key={pid} className="score-item">
            Player {pid}: {score} {pid === playerID && '(You)'}
          </div>
        ))}
      </div>
    );

    return (
      <div className="memory-game-container">
        {disconnected}
        {gameStatus}
        {!ctx.gameover && currentPlayerIndicator}
        {scores}
        <div className="cards-grid">
          {G.cards.map((card, index) => this.renderCard(card, index))}
        </div>
      </div>
    );
  }
}

export default MemoryBoard;
