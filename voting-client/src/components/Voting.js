import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import Winner from './Winner'
import Vote from './Vote';
import * as actionCreators from '../action_creators';

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	}
}

export class Voting extends Component {
	// https://facebook.github.io/react/docs/shallow-compare.html
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	render() {
		return (
			<div className='voting'>
				{ this.props.winner
					? <Winner ref='winner' winner={ this.props.winner } />
					: <Vote { ...this.props } />
				}
			</div>
		)
	}
}

export const VotingContainer = connect(
	mapStateToProps,
	actionCreators
)(Voting);

// module.exports = Voting;
// module.exports = VotingContainer;
