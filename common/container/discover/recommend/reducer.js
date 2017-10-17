/**
* home reducer
*/

import { combineReducers } from 'redux'
import { RECOMMEND } from './action'
let homeVo = {
  banner: [{
    link: '',
    imgurl: ''
  }],
  recommendMusics: []
}

function recommend(state = homeVo, action) {
  switch (action.type) {
    case RECOMMEND:
      return action.obj
    default:
      return state
  }
}


const Reducers = combineReducers({
  recommend
})

export default Reducers