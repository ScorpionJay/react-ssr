require('babel-polyfill')

require('source-map-support').install()

require('babel-register')({
    presets: ['env', 'react'],
    plugins: ['add-module-exports']
})


const app = require('./app.js')
const views = require('koa-views')
const route = require('koa-route')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const clientRoute = require('./clientRoute.js')


const port = 3000


require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

app.use( views(path.join(__dirname, './view/prod'), {
  map: {
    html: 'ejs'
  }
}))
app.use(static(path.resolve(__dirname, '../dist/client')))

app.use( route.get('/test', async (ctx,next) => {
    await ctx.render('index', {
       	root: 'jay'
    })
}))



app.use(clientRoute)

const discover = require('./controller/discover')
app.use( route.get('/api/banner', discover))




app.listen(port,()=>{
	console.log(' server started, bind port %d',port)
});
