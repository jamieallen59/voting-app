import React, { Component } from 'react';
import Winner from './Winner';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import * as actionCreators from '../action_creators';

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export class Results extends Component {
	constructor() {
		super();
		this.getPair = this.getPair.bind(this);
		this.getVotes = this.getVotes.bind(this);
	}
	// https://facebook.github.io/react/docs/perf.html
	// https://facebook.github.io/react/docs/shallow-compare.html
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getPair() {
		return this.props.pair || [];
	}

	getVotes(entry) {
		if(this.props.tally && this.props.tally.has(entry)) {
			return this.props.tally.get(entry);
		}
		return 0;
	}

	render() {
		return this.props.winner
			? <Winner ref='winner' winner={ this.props.winner } />
			: <div className='results'>
				<div className='tally'>
				{this.getPair().map((entry) => {
					<div key={ entry } className='entry'>
						<h1>{ entry }</h1>
						<div className="voteCount">
							{ this.getVotes(entry) }
						</div>
					</div>
				})}
				</div>
				<div className='management'>
					<button ref='next'
							className='next'
							onClick={ this.props.next }>
					</button>
				</div>
			</div>

	}
}
export const ResultsContainer = connect(
	mapStateToProps,
	actionCreators
)(Results);
// export const Results = Results;
// module.exports = Results;
// module.exports = ResultsContainer;
