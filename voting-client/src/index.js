import React from 'react';
import ReactDOM from 'react-dom';
import { VotingContainer } from './components/Voting';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { setState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import io from 'socket.io-client';
import { Route, Router, hashHistory } from 'react-router';
import App from './components/App';
import { ResultsContainer } from './components/Results';

// This is my Redux store. It holds our immutable application state.
// it applies middlware to allow sending info to a server and logging.
const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

// listens to events. When we get one, we simply
// dispatch a SET_STATE action to our Store which already
// has a reducer to handle it
const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => {
	store.dispatch(setState(state));
});

const routes = (
	<Route component={ App }>
		<Route path='/results' component={ ResultsContainer } />
		<Route path='/' component={ VotingContainer } />
	</Route>
)

// Provider, from the React-redux bindings causes the Provider
// to be an ancestor to all of our applications components.
ReactDOM.render(
	<Provider store={ store }>
		<Router history={ hashHistory }>
			{ routes }
		</Router>
	</Provider>,
	document.getElementById('app')
);
