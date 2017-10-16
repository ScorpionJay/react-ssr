/**
 * react路由
 */

import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../client/src/stores'
import { Router, StaticRouter } from 'react-router'

import App from '../client/src/app'

const request = require('request')

// 封装 Ajax，返回一个 Promise
const requestP = (url) => (
    new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
        })
    })
)

const clientRoute = async (ctx, next) => {
    console.log('url', ctx.url)
    const url = ctx.url
    let store = {};
    if (url.indexOf('discover') != -1) {
        let data = await requestP('http://localhost:8889/api/banner')
        console.log(data)
        store = configureStore(//{}
            { "home": { "home": { "banner": JSON.parse(data) } } }
        )
    } else {
        store = configureStore({}
        )
    }

    // console.log(store.getState())
    const context = {}
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )
    // console.log(html)
    await ctx.render('index', {
        root: html,
        state: store.getState()
    })
    await next()
}

export default clientRoute





