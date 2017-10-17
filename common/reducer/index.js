/**
 * reducer 合并
 */

import { combineReducers } from 'redux'

import recommend from '../container/discover/recommend/reducer'
import playlist from '../container/discover/playlist/reducer'
import album from '../container/album/reducer'
import music from '../container/play/reducer'
import spin from './spin'

export default combineReducers({
	recommend,
	playlist,
	album,
	music,
	spin
})
