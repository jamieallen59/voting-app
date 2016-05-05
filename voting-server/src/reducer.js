import { setEntries, next, vote, INITIAL_STATE } from './core';

// INIITIAL_STATE is set as the default value of the reducer

export default function reducer(state = INITIAL_STATE, action) {
	// Figure out which function to call and call it

	switch(action.type) {
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
		case 'NEXT':
			return next(state, action);
		case 'VOTE':
			return state.update('vote', voteState => {
				 return vote(voteState, action.entry)
			});
	}
	return state;
}
