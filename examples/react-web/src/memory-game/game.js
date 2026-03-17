/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

// Shuffles an array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create pairs of cards (8 pairs = 16 cards)
function createCards() {
  const symbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎹'];
  const cards = [];

  symbols.forEach((symbol, index) => {
    cards.push({ id: index * 2, symbol, matched: false });
    cards.push({ id: index * 2 + 1, symbol, matched: false });
  });

  return shuffleArray(cards);
}

const MemoryGame = {
  name: 'memory-game',

  minPlayers: 2,
  maxPlayers: 4,

  setup: () => ({
    cards: createCards(),
    flipped: [], // Currently flipped card indices
    scores: {}, // Player scores
  }),

  moves: {
    flipCard({ G, ctx, playerID }, cardIndex) {
      // Can't flip if it's not your turn
      if (ctx.currentPlayer !== playerID) {
        return;
      }

      // Can't flip if already 2 cards are flipped
      if (G.flipped.length >= 2) {
        return;
      }

      // Can't flip already matched cards
      if (G.cards[cardIndex].matched) {
        return;
      }

      // Can't flip same card twice
      if (G.flipped.includes(cardIndex)) {
        return;
      }

      const flipped = [...G.flipped, cardIndex];

      // If this is the second card flipped, check for match
      if (flipped.length === 2) {
        const [first, second] = flipped;
        const firstCard = G.cards[first];
        const secondCard = G.cards[second];

        // Check if they match
        if (firstCard.symbol === secondCard.symbol) {
          // Match found!
          const cards = [...G.cards];
          cards[first] = { ...cards[first], matched: true };
          cards[second] = { ...cards[second], matched: true };

          // Update score
          const scores = { ...G.scores };
          scores[playerID] = (scores[playerID] || 0) + 1;

          return {
            ...G,
            cards,
            flipped: [],
            scores,
          };
        }
      }

      return { ...G, flipped };
    },

    resetFlipped({ G, ctx }) {
      // Only allow current player to reset
      if (G.flipped.length === 2) {
        return { ...G, flipped: [] };
      }
    },
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
    onEnd: ({ G }) => {
      // Auto-reset flipped cards at end of turn if they didn't match
      if (G.flipped.length === 2) {
        return { ...G, flipped: [] };
      }
    },
  },

  endIf: ({ G }) => {
    // Game ends when all cards are matched
    const allMatched = G.cards.every((card) => card.matched);
    if (allMatched) {
      // Find winner (player with most matches)
      let maxScore = 0;
      let winners = [];

      Object.entries(G.scores).forEach(([playerID, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winners = [playerID];
        } else if (score === maxScore) {
          winners.push(playerID);
        }
      });

      if (winners.length === 1) {
        return { winner: winners[0] };
      } else {
        return { draw: true, winners };
      }
    }
  },
};

export default MemoryGame;
