import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Winner from './Winner'
import Vote from './Vote';

class Voting extends Component {
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

module.exports = Voting;
