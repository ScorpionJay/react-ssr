/**
 * 开发环境server配置
 */

require('babel-polyfill')

require('source-map-support').install()

require('babel-register')({
    presets: [
        ['env', { loose: true }],
        'react'],
    plugins: ['add-module-exports']
})

const app = require('./app.js')
const views = require('koa-views')
const route = require('koa-route')
const path = require('path')
const fs = require('fs')
const reactRoute = require('./reactRoute.js')

const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const convert = require('koa-convert')

const config = require('../config/webpack.dev')
const compile = webpack(config)

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

// Image required hook
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000,
    name: '/[hash].[ext]'
})

app.use(convert(devMiddleware(compile, {
    noInfo: true,
    hot: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath
})))
app.use(convert(hotMiddleware(compile, {
    path: '/__webpack_hmr'
})));


compile.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

app.use(views(path.join(__dirname, './view/dev'), {
    map: {
        html: 'ejs'
    }
}))

app.use(route.get('/test', async (ctx, next) => {
    await ctx.render('index', {
        root: 'jay'
    })
}))



app.use(reactRoute)

const discover = require('./controller/discover')
app.use(route.get('/api/banner', discover))




app.listen(port, () => {
    console.log(' server started, bind port %d', port)
});
