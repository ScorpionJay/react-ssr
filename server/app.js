/**
 * koa config
 */

import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'

const app = new Koa()

app.use(logger())
app.use(compress())

export default app


