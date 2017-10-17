import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'

const store = function (initialState) {

	let middlware = applyMiddleware(thunk)
	let store = createStore(reducers, initialState, middlware)

	return store
}

export default store