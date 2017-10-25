/**
 * login controller
 */

import request from '../util/request'
import config from '../util/config'
import jwt from 'jsonwebtoken'

const account = async (ctx, next) => {
    let data = ctx.request.body
    let token = ctx.request.header.auth
    let decoded = jwt.verify(token, 'ttttttt')

    console.log(decoded)

    ctx.body = {name:'test'}
}


export default { account }