/**
 * 专辑action
 */

import Config from '../../config'
import { spin, spinHidden } from '../../action/spin'
import api from '../../util/api'

export const ALBUM = 'ALBUM'

const album = (obj) => ({ type: ALBUM, obj })

export function albumAction(id) {
    return async dispatch => {
        dispatch(spin())
        try {
            let data = await api(Config.playListAPI.replace('id', id));
            let d = {
                list: data.list.list.info,
                info: data.info.list
            }
            dispatch(album(d))
            dispatch(spinHidden())
        } catch (error) {
            console.log('error', error);
            dispatch(spinHidden())
        }
    }
}



