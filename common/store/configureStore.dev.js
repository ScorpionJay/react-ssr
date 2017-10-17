import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../reducer'

// import DevTools from '../container/DevTools'
// import {persistState} from 'redux-devtools'

// const createStoreWithMiddleware = compose(
//   DevTools.instrument(),
//   persistState(getDebugSessionKey())
// )(createStore);

// function getDebugSessionKey() {
//   const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

//   return (matches && matches.length > 0) ? matches[1] : null;
// }


let middlware;
if (process.env.NODE_ENV === 'production') {
	middlware = applyMiddleware(thunk)
} else {
	middlware = applyMiddleware(thunk, createLogger())
}


const composeEnhancers =
	typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

const enhancer = composeEnhancers(
	middlware,
	// other store enhancers if any
);

// const enhancer = compose(
//   //你要使用的中间件，放在前面
//   middlware,
//   //必须的！启用带有monitors（监视显示）的DevTools
//   DevTools.instrument()
// )

const store = function (initialState) {
	let createStoreWithMiddleware;
	// if (process.env.NODE_ENV === 'production') {
	// 	createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
	// }else{
	// 	const logger = createLogger();
	// 	createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
	// }
	// let store = createStoreWithMiddleware(reducers, initialState);

	// createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore)
	// let store = createStoreWithMiddleware(reducers, initialState)


	const store = createStore(reducers, initialState, enhancer)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducer', () => {
			const nextReducer = require('../reducer');

			store.replaceReducer(nextReducer);
		});
	}


	return store
}

export default store