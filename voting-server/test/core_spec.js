import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../src/core';

describe('Application logic:', () => {

	// Loading Entries
	// Allows 'loading in' a set of entries to be voted on
	// setEntries takes a previous state and a set of entries and produces a new state
	describe('setEntries', () => {
		it('adds the entries to the state', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});
	});

	describe('next', () => {
		// Starting The Vote
		// Creates a vote 'Map' on the state, where the first two entries are included under a key, pair.
		// Those entries should then not longer be in the 'entries' List.
		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			})
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}))
		})

		// Moving To The Next pair
		// Once the vote is given, we need to proceed to the next one.
		// The winning entry from the current vote is kept and added back to 'entries'
		// The losing entry is thrown away. If it is a tie, they are both kept.
		it('puts winner of the current vote back into the entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					}),
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			})
			const nextState = next(state);
			expect(nextState).to.equal(Map ({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127 Hours', 'Trainspotting')
			}))
		})

		it('puts both from a tied vote back into entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 2,
						'28 Days Later': 2
					}),
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			})
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127 Hours', 'Trainspotting',  '28 Days Later')
			}))
		})

		// Ending The Vote
		// When there is only one entry left, we have our winner.
		// We should state that explicitly
		it('marks the winner when there is just one entry left', () => {
			const state =  Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					}),
				}),
				entries: List()
			});
			const nextState = next(state)
			expect(nextState).to.equal(Map({
				winner: 'Trainspotting'
			}))
		})
	})

	// Voting
	// While a vote is ongoing, people should be able to vote on entries.
	// When a vote is cast, a 'tally' should appear on the vote
	// If a tally already exists, it should be incremented
	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28 Days Later')
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 1
				}),
			}));
		})

		it('adds to an exisiting tally for the voted entry', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 3,
					'28 Days Later': 2
				})
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 4,
					'28 Days Later': 2
				})
			}))
		})
	})

});
