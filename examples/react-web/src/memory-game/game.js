import { INVALID_MOVE } from 'boardgame.io/core';

// Helper function to create shuffled deck
function createDeck() {
  // 8 pairs of cards (16 cards total)
  const symbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎬'];
  const deck = [];

  // Create pairs
  symbols.forEach((symbol, index) => {
    deck.push({ id: index * 2, symbol, matched: false });
    deck.push({ id: index * 2 + 1, symbol, matched: false });
  });

  return deck;
}

// Helper to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Check if two cards match
function cardsMatch(card1, card2) {
  return card1.symbol === card2.symbol;
}

// Check if all cards are matched
function allMatched(cards) {
  return cards.every(card => card.matched);
}

const MemoryGame = {
  name: 'memory-game',

  setup: ({ random }) => ({
    cards: shuffleArray(createDeck()),
    flipped: [],        // IDs of currently flipped cards
    matched: [],        // IDs of matched cards
    attempts: 0,        // Number of attempts made
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    flipCard: ({ G, ctx, playerID }, id) => {
      const card = G.cards[id];

      // Invalid moves
      if (!card) return INVALID_MOVE;
      if (G.matched.includes(id)) return INVALID_MOVE;
      if (G.flipped.includes(id)) return INVALID_MOVE;
      if (G.flipped.length >= 2) return INVALID_MOVE;

      const flipped = [...G.flipped, id];
      let matched = [...G.matched];
      let attempts = G.attempts;

      // If this is the second card flipped
      if (flipped.length === 2) {
        attempts++;
        const card1 = G.cards[flipped[0]];
        const card2 = G.cards[flipped[1]];

        // Check if cards match
        if (cardsMatch(card1, card2)) {
          matched = [...matched, ...flipped];
        }
      }

      return {
        ...G,
        flipped,
        matched,
        attempts,
      };
    },

    resetFlipped: ({ G }) => {
      return {
        ...G,
        flipped: [],
      };
    },
  },

  endIf: ({ G, ctx }) => {
    if (allMatched(G.cards)) {
      return {
        winner: ctx.currentPlayer,
        attempts: G.attempts,
      };
    }
  },
};

export default MemoryGame;
