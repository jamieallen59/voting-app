// http://redux.js.org/docs/advanced/Middleware.html
// Middleware uses currying: https://en.wikipedia.org/wiki/Currying
export default socket => store => next => action => {
	if(action.meta && action.meta.remote) {
		socket.emit('action', action);
	}
	return next(action);
}
