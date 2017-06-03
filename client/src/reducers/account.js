import { combineReducers } from 'redux'
import { LOGIN,USER } from '../actions/account'

function token(state = '', action) {
  switch (action.type) {
    case LOGIN:
      return action.token
    default:
      return state
  }
}

const user = (state = {}, action) =>{
	switch (action.type) {
	    case USER:
	      return action.obj
	    default:
	      return state
	  }
}

const reducer = combineReducers({
  token,user
})

export default reducer