/**
 * devloper server config
 */

// 转换新的api
require('babel-polyfill')

// map
require('source-map-support').install()

// 钩子函数，将es6转成es5
require('babel-register')({
    presets: [
        [
            'env',
            {
                'targets': {
                    'node': 'current'
                }
            }

        ],
        'react'
    ],
    plugins: [
        // import require不统一问题
        'add-module-exports'
    ]
})


// sass hook
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

// image hook
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    // limit: 8000,
    name: '/[hash].[ext]'
})

const app = require('./app.js')
const views = require('koa-views')
const route = require('koa-route')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const convert = require('koa-convert')
const config = require('../build/webpack.dev')
const reactRoute = require('./reactRoute.js')

const compile = webpack(config)

const port = 3000

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

// ejs 模版
app.use(views(path.join(__dirname, './view/dev'), {
    map: {
        html: 'ejs'
    }
}))

// redirect
app.use(route.get('/', ctx => ctx.response.redirect('/discover/recommend')))
app.use(route.get('/discover', ctx => ctx.response.redirect('/discover/recommend')))

// react路由
app.use(reactRoute)

// api
const discover = require('./controller/discover')
app.use(route.get('/api/banner', discover.banner))
app.use(route.get('/api/music', discover.music))
app.use(route.get('/api/album/*', discover.album))
app.use(route.get('/api/musicDetail/*', discover.musicDetail))

app.listen(port, () => {
    console.log(' server started, bind port %d', port)
})
