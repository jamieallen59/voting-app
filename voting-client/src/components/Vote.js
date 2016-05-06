import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class Vote extends Component {
	constructor() {
		super();
		this.getPair = this.getPair.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
		this.hasVotedFor = this.hasVotedFor.bind(this);
	}

	// https://facebook.github.io/react/docs/shallow-compare.html
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getPair() {
		return this.props.pair || [];
	}

	isDisabled() {
		return !!this.props.hasVoted;
	}

	hasVotedFor(entry) {
		return this.props.hasVoted === entry;
	}

	render() {
		return (
			<div className='voting'>
				{this.getPair().map((entry) => {
					return (
						<button key={entry}
								disabled={ this.isDisabled() }
								onClick={ () => this.props.vote(entry) }>
							<h1>{entry}</h1>
							{ this.hasVotedFor(entry)
								? <div className='label'>Voted</div>
								: null }
						</button>
					)
				})}
			</div>
		)
	}
}
//
// Vote.propTypes = {
// 	pair: PropTypes.object.isRequired,
// 	hasVoted: PropTypes.string.isRequired
// }

module.exports = Vote
