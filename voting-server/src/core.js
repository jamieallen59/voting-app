import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

const getWinners = (vote) => {
	if(!vote) return [];
	const [a, b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);

	if 		(aVotes > bVotes)	return [a];
	else if (aVotes < bVotes) 	return [b];
	else 						return [a, b];
}

export function next(state) {
	const entries = state.get('entries')
						 .concat(getWinners(state.get('vote')));

	if (entries.size === 1) {
		return state.remove('vote')
					.remove('entries')
					.set('winner', entries.first());
	} else {
		return state.merge({
			vote: Map({
				pair: entries.take(2)
			}),
			entries: entries.skip(2)
		})
	}
}

export function vote(voteState, thisVote) {
	// what updateIn is doing:
	// reach into the nested data structure path 'vote', 'tally', thisVote
	// and apply this function there. If there are keys missing, create a new map in their place.
	// if the value at the end is missing, initialise it with '0'
	return voteState.updateIn (
		['tally', thisVote],
		0,
		tally => tally + 1
	);
}
