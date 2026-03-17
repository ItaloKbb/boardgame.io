import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    isPreview: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    // Auto-reset flipped cards after 1 second if they don't match
    if (this.props.G.flipped.length === 2 && prevProps.G.flipped.length !== 2) {
      const flipped = this.props.G.flipped;
      const matched = this.props.G.matched;

      // Check if the two flipped cards are not in matched array
      if (!matched.includes(flipped[0]) || !matched.includes(flipped[1])) {
        setTimeout(() => {
          if (this.props.moves && this.props.moves.resetFlipped) {
            this.props.moves.resetFlipped();
          }
        }, 1000);
      }
    }
  }

  onClick = (id) => {
    const { G, moves, isActive } = this.props;

    // Don't allow clicks if not active or if already have 2 cards flipped
    if (!isActive) return;
    if (G.flipped.length >= 2) return;
    if (G.matched.includes(id)) return;
    if (G.flipped.includes(id)) return;

    moves.flipCard(id);
  };

  renderCard = (card, index) => {
    const { G } = this.props;
    const isFlipped = G.flipped.includes(index);
    const isMatched = G.matched.includes(index);
    const showCard = isFlipped || isMatched;

    return (
      <div
        key={index}
        className={`card ${showCard ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
        onClick={() => this.onClick(index)}
      >
        <div className="card-inner">
          <div className="card-front">?</div>
          <div className="card-back">{card.symbol}</div>
        </div>
      </div>
    );
  };

  render() {
    const { G, ctx, playerID } = this.props;

    let winner = null;
    if (ctx.gameover) {
      winner = ctx.gameover.winner === playerID ? 'You won!' : 'Game Over!';
    }

    return (
      <div className="memory-game">
        <div className="game-info">
          <h2>Memory Game</h2>
          <div className="stats">
            <p>Attempts: {G.attempts}</p>
            <p>Matches: {G.matched.length / 2} / 8</p>
            {!ctx.gameover && (
              <p className="status">
                {G.flipped.length === 2 ? 'Checking...' : 'Click cards to flip them'}
              </p>
            )}
          </div>
        </div>

        <div className="cards-grid">
          {G.cards.map((card, index) => this.renderCard(card, index))}
        </div>

        {winner && (
          <div className="winner">
            <h3>{winner}</h3>
            <p>Completed in {G.attempts} attempts!</p>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
