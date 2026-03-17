/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { InMemory } from './inmemory';
import type { State, Server } from '../../types';

describe('InMemory', () => {
  let db: InMemory;

  beforeAll(() => {
    db = new InMemory();
    db.connect();
  });

  // Must return undefined when no game exists.
  test('must return undefined when no game exists', () => {
    const { state } = db.fetch('matchID', { state: true });
    expect(state).toEqual(undefined);
  });

  test('createMatch', () => {
    const stateEntry: unknown = { a: 1 };

    // Create match.
    db.createMatch('matchID', {
      metadata: {
        gameName: 'tic-tac-toe',
        updatedAt: new Date(2020, 1).getTime(),
      } as Server.MatchData,
      initialState: stateEntry as State,
    });

    // Must return created game.
    const { state } = db.fetch('matchID', { state: true });
    expect(state).toEqual(stateEntry);

    // Fetch initial state.
    const { initialState } = db.fetch('matchID', { initialState: true });
    expect(initialState).toEqual(stateEntry);
  });

  describe('listMatches', () => {
    test('filter by gameName', () => {
      let keys = db.listMatches();
      expect(keys).toEqual(['matchID']);
      keys = db.listMatches({ gameName: 'tic-tac-toe' });
      expect(keys).toEqual(['matchID']);
      keys = db.listMatches({ gameName: 'chess' });
      expect(keys).toEqual([]);
    });

    test('filter by isGameover', () => {
      const stateEntry: unknown = { a: 1 };
      db.createMatch('matchID2', {
        metadata: {
          gameName: 'tic-tac-toe',
          gameover: 'gameover',
          updatedAt: new Date(2020, 3).getTime(),
        } as Server.MatchData,
        initialState: stateEntry as State,
      });

      let keys = db.listMatches({});
      expect(keys).toEqual(['matchID', 'matchID2']);
      keys = db.listMatches({ where: { isGameover: true } });
      expect(keys).toEqual(['matchID2']);
      keys = db.listMatches({ where: { isGameover: false } });
      expect(keys).toEqual(['matchID']);
    });

    test('filter by updatedBefore', () => {
      const stateEntry: unknown = { a: 1 };
      db.createMatch('matchID3', {
        metadata: {
          gameName: 'tic-tac-toe',
          updatedAt: new Date(2020, 5).getTime(),
        } as Server.MatchData,
        initialState: stateEntry as State,
      });
      const timestamp = new Date(2020, 4);

      let keys = db.listMatches({});
      expect(keys).toEqual(['matchID', 'matchID2', 'matchID3']);
      keys = db.listMatches({ where: { updatedBefore: timestamp.getTime() } });
      expect(keys).toEqual(['matchID', 'matchID2']);
    });

    test('filter by updatedAfter', () => {
      const timestamp = new Date(2020, 4);

      let keys = db.listMatches({});
      expect(keys).toEqual(['matchID', 'matchID2', 'matchID3']);
      keys = db.listMatches({ where: { updatedAfter: timestamp.getTime() } });
      expect(keys).toEqual(['matchID3']);
    });

    test('filter combined', () => {
      const timestamp = new Date(2020, 4);
      const timestamp2 = new Date(2020, 2, 15);
      let keys = db.listMatches({
        gameName: 'chess',
        where: { isGameover: true },
      });
      expect(keys).toEqual([]);
      keys = db.listMatches({
        where: { isGameover: true, updatedBefore: timestamp.getTime() },
      });
      expect(keys).toEqual(['matchID2']);
      keys = db.listMatches({
        where: { isGameover: false, updatedBefore: timestamp.getTime() },
      });
      expect(keys).toEqual(['matchID']);
      keys = db.listMatches({
        where: { isGameover: true, updatedAfter: timestamp.getTime() },
      });
      expect(keys).toEqual([]);
      keys = db.listMatches({
        where: { isGameover: false, updatedAfter: timestamp.getTime() },
      });
      expect(keys).toEqual(['matchID3']);
      keys = db.listMatches({
        where: {
          updatedBefore: timestamp.getTime(),
          updatedAfter: timestamp2.getTime(),
        },
      });
      expect(keys).toEqual(['matchID2']);
    });
  });

  test('remove', () => {
    // Must remove game from DB
    db.wipe('matchID');
    expect(db.fetch('matchID', { state: true })).toEqual({});
    // Shall not return error
    db.wipe('matchID');
  });

  describe('chat history', () => {
    test('returns empty array when no messages have been sent', () => {
      expect(db.getChatHistory('noChatMatch')).toEqual([]);
    });

    test('persists and retrieves chat messages in order', () => {
      const msg1 = { id: 'c1', sender: '0', payload: 'hi' };
      const msg2 = { id: 'c2', sender: '1', payload: 'hello' };
      db.setChatMessage('chatMatch', msg1);
      db.setChatMessage('chatMatch', msg2);
      expect(db.getChatHistory('chatMatch')).toEqual([msg1, msg2]);
    });

    test('isolates chat history per match', () => {
      const msgA = { id: 'a1', sender: '0', payload: 'msgA' };
      const msgB = { id: 'b1', sender: '1', payload: 'msgB' };
      db.setChatMessage('matchA', msgA);
      db.setChatMessage('matchB', msgB);
      expect(db.getChatHistory('matchA')).toEqual([msgA]);
      expect(db.getChatHistory('matchB')).toEqual([msgB]);
    });
  });
});
