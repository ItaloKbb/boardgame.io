/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

// TODO: separate testing for TicTacToe from this overall test

import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './app';

Enzyme.configure({ adapter: new Adapter() });

const Grid = (n) => new Array(n).fill(null);

// This wraps up the App in a MemoryRouter, which let's us set the route how we want
const RoutedApp = (props) => (
  <MemoryRouter initialEntries={[props.route]}>
    <App />
  </MemoryRouter>
);
RoutedApp.propTypes = {
  route: PropTypes.string,
};

test('sanity', () => {
  Enzyme.mount(<RoutedApp route="/" />);
});

test('makeMove changes the game state', () => {
  const game = Enzyme.mount(<RoutedApp route="/" />);
  const board = game.find('Board').instance();

  expect(board.props.G).toEqual({
    cells: Grid(9),
  });

  const moves = [0, 1];

  for (let id of moves) {
    board.props.moves.clickCell(id);
  }

  expect(board.props.G).toEqual({
    cells: ['0', '1'].concat(Grid(7)),
  });
  expect(board.props.ctx.gameover).toEqual(undefined);
});

test('clicked cells are inactive', () => {
  const game = Enzyme.mount(<RoutedApp route="/" />);

  expect(game.find('td').get(0).props.className).toBe('active');
  game.find('td').forEach((node) => node.simulate('click'));
  expect(game.find('td').get(0).props.className).toBe('');
});

test('victory', () => {
  const game = Enzyme.mount(<RoutedApp route="/" />);
  const board = game.find('Board').instance();
  const cells = new Array(9).fill(null);

  expect(board.props.G).toEqual({
    cells: cells,
  });
  expect(board.props.ctx.gameover).toEqual(undefined);

  const moves = [0, 3, 1, 4, 2];

  for (let id of moves) {
    board.props.moves.clickCell(id);
  }

  expect(board.props.G).toEqual({
    cells: ['0', '0', '0', '1', '1'].concat(Grid(4)),
  });
  expect(board.props.ctx.gameover).toEqual({ winner: '0' });
});

test('memory game renders with correct initial state', () => {
  const game = Enzyme.mount(<RoutedApp route="/memory-game" />);
  const board = game.find('MemoryBoard').instance();

  expect(board.props.G.cards).toHaveLength(16);
  expect(board.props.G.flipped).toEqual([]);
  expect(board.props.G.scores).toEqual({});
  expect(board.props.ctx.gameover).toEqual(undefined);
});

test('memory game flipCard flips a card', () => {
  const game = Enzyme.mount(<RoutedApp route="/memory-game" />);
  const board = game.find('MemoryBoard').instance();

  board.props.moves.flipCard(0);

  expect(board.props.G.flipped).toEqual([0]);
});

test('memory game two non-matching cards reset after turn', () => {
  const game = Enzyme.mount(<RoutedApp route="/memory-game" />);
  const board = game.find('MemoryBoard').instance();

  // Find two cards that don't match
  const { cards } = board.props.G;
  let nonMatchingFirstIdx = -1;
  let nonMatchingSecondIdx = -1;
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].symbol !== cards[j].symbol) {
        nonMatchingFirstIdx = i;
        nonMatchingSecondIdx = j;
        break;
      }
    }
    if (nonMatchingFirstIdx !== -1) break;
  }

  board.props.moves.flipCard(nonMatchingFirstIdx);
  board.props.moves.flipCard(nonMatchingSecondIdx);

  // After two non-matching flips the move calls endTurn, which triggers
  // turn.onEnd to reset flipped cards
  expect(board.props.G.flipped).toEqual([]);
});

test('memory game two matching cards score a point', () => {
  const game = Enzyme.mount(<RoutedApp route="/memory-game" />);
  const board = game.find('MemoryBoard').instance();

  // Find two cards that match
  const { cards } = board.props.G;
  let matchingFirstIdx = -1;
  let matchingSecondIdx = -1;
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].symbol === cards[j].symbol) {
        matchingFirstIdx = i;
        matchingSecondIdx = j;
        break;
      }
    }
    if (matchingFirstIdx !== -1) break;
  }

  const currentPlayer = board.props.ctx.currentPlayer;
  board.props.moves.flipCard(matchingFirstIdx);
  board.props.moves.flipCard(matchingSecondIdx);

  expect(board.props.G.cards[matchingFirstIdx].matched).toBe(true);
  expect(board.props.G.cards[matchingSecondIdx].matched).toBe(true);
  expect(board.props.G.scores[currentPlayer]).toBe(1);
  expect(board.props.G.flipped).toEqual([]);
});
