/**
* koa2 server
*/
const Koa = require('koa')
const logger = require('koa-logger')
const compress = require('koa-compress')
const views = require('koa-views')
const route = require('koa-route')
const koaStatic = require('koa-static')
const path = require('path')
const reactRoute = require('./reactRoute.js')

const app = new Koa()
app.use(logger())
app.use(compress())

const port = 4000

app.use(views(path.resolve(process.cwd(), './server/view/prod'), {map: {html: 'ejs'}}))
app.use(koaStatic('./dist/client'))

// for test
app.use( route.get('/test', async (ctx,next) => {
    await ctx.render('index', {
        root: 'jay',
        state: 'hello'
    })
}))

// rest api
const discover = require('./controller/discover')
app.use( route.get('/api/banner', discover))

app.use(reactRoute)

app.listen(port,()=>{
    console.log(' server started, bind port %d',port)
});

