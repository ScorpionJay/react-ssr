/**
 * production server config
 */
require('babel-polyfill')

const Koa = require('koa')
const logger = require('koa-logger')
const compress = require('koa-compress')
const views = require('koa-views')
const route = require('koa-route')
const koaStatic = require('koa-static')
const path = require('path')
const app = require('./app.js')
const reactRoute = require('./reactRoute.js')

const port = 4000

app.use(views(path.resolve(__dirname, '../dist/server'), { map: { html: 'ejs' } }))
app.use(koaStatic(path.resolve(__dirname, '../dist/client')))


// redirect
app.use(route.get('/', ctx => ctx.response.redirect('/discover/recommend')))
app.use(route.get('/discover', ctx => ctx.response.redirect('/discover/recommend')))
app.use(reactRoute)
// rest api
const discover = require('./controller/discover')
app.use(route.get('/api/banner', discover.banner))
app.use(route.get('/api/music', discover.music))
app.listen(port, () => {
    console.log(' server started, bind port %d', port)
});

