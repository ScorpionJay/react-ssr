/**
 * react路由
 */

import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Router, StaticRouter } from 'react-router'
import App from '../common/container/app'
import configureStore from '../common/store'

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
    if(url.indexOf('api') === -1){
        if (url.indexOf('discover') != -1) {
            let data = await requestP('http://localhost:8889/banner')
            let music = await requestP('http://localhost:8889/music')
            console.log(data)
            // 这里是否用action


            store = configureStore(//{}
                { "recommend": { 
                    "recommend": { "banner": JSON.parse(data),
                                    "recommendMusics":JSON.parse(music)
                                 }
                    } 
                }
            )
        } else {
            store = configureStore({}
            )
        }

        console.log(store.getState())
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
    }else{
        await next()
    }
}

export default clientRoute





