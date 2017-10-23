/**
 * koa config
 */

import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
const route = require('koa-route')
const app = new Koa()

app.use(logger())
app.use(compress())
app.use(bodyParser())

export default app


