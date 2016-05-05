import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class Winner extends Component {
	// https://facebook.github.io/react/docs/shallow-compare.html
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	
	render() {
		return (
			<div className='winner'>
				Winner is { this.props.winner }
			</div>
		)
	}
}

module.exports = Winner;
