import makeStore from './src/store';
import startServer from './src/server';

import entries from '/entries.json'

const store = makeStore();
startServer(store);

store.dispatch({
	type: 'SET_ENTRIES',
	entries: entries
});
store.dispatch({type: 'NEXT'});

module.exports = store;
