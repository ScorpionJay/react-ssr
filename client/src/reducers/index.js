import { combineReducers } from 'redux'
import  home from './home'
import  account from './account'
import  spin from './spin'
import  message from './message'
import  dialog from './dialog'
// import  user from './user'
import  album from './album'
import  music from './music'
import  search from './search'
import  rank from './rank'
import  router from './router'

const reducers = combineReducers({
  home,
  account,
  spin,
  message,
  dialog,
  // user,
  album,
  music,
  search,
  rank,
  router
})

export default reducers