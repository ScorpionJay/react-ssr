/**
* album reducer
*/

import { combineReducers } from 'redux'
import { ALBUM } from './action'

let vo = {
  list: [],
  info: {
    specialname: "",
    nickname: "",
    publishtime: "",
    singername: "",
    intro: "",
    songcount: 0,
    imgurl: '',
    specialid: 0,
    suid: 0,
    collectcount: 0,
    playcount: 0,
    slid: 0
  }
}


function album(state = vo, action) {
  switch (action.type) {
    case ALBUM:
      return action.obj
    default:
      return state
  }
}

const Reducers = combineReducers({
  album
})

export default Reducers