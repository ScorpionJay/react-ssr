/**
 * 歌曲列表action
 */
import Config from '../../../config'
import { spin, spinHidden } from '../../../action/spin'
import api from '../../../util/api'

export const PLAYLIST = 'PLAYLIST'
export const SCROLLTOP = 'SCROLLTOP'

const playlist = (obj) => ({ type: PLAYLIST, obj })
const scrollTop = (obj) => ({ type: SCROLLTOP, obj })


export function playlistAction(d) {
    return async dispatch => {
        dispatch(spin())
        try {
            let page = d.page + 1
            let musicList = await api(Config.musicListAPI, 'get', { page: page, json: true })
            let data = {}
            data.playlist = d.page === 0 ? musicList.plist.list.info : d.playlist.concat(musicList.plist.list.info)
            data.page = page
            dispatch(playlist(data))
            dispatch(spinHidden())
        } catch (error) {
            console.log('error', error);
            dispatch(spinHidden())
        }
    }
}

export const scrollTopAction = (value) => {
    return dispatch => {
        dispatch(scrollTop(value))
    }
}