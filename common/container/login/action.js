export const LOGIN = 'LOGIN'

import request from '../../util/request'
import storage from '../../util/storage'


const login = obj => ({ type: LOGIN, obj })


import encrypt from '../../util/encrypt'

export const loginAction = (mobile,pwd,callback) => async dispatch => {
    console.log('action pass value', mobile,pwd)

    // 加密
    let encryptData = encrypt(pwd)
    console.log(encryptData)

    // console.log(a)
    // let data = await request( '../mock/login.json','get',encryptData )
    let data = await request( '/api/test','post',encryptData )

    callback(data)
    dispatch(login({ data }))
    storage.put('token',JSON.stringify(data))
    
}

