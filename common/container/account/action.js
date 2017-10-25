export const ACCOUNT = 'ACCOUNT'

import request from '../../util/request'
import storage from '../../util/storage'


export const account = obj => ({ type: ACCOUNT, obj })


export const accountAction = (token) => async dispatch => {

    let data = await request({
        url: '/api/account',
        method: 'post',
        headers: {
            auth: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    console.log('data', data)



}

