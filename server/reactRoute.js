/**
 * react路由
 */

import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Router, StaticRouter } from 'react-router'
import App from '../common/container/app'
import configureStore from '../common/store'

import request from './util/request'
import config from './util/config'

const clientRoute = async (ctx, next) => {
    console.log('url', ctx.url)
    const url = ctx.url
    let store = {}
    if (url.indexOf('api') === -1) {
        if (url.indexOf('/discover/recommend') != -1) {
            let data = await request(config.banner)
            let music = await request(config.music)
            store = configureStore(
                {
                    "recommend": {
                        "recommend": {
                            "banner": JSON.parse(data),
                            "recommendMusics": JSON.parse(music)
                        }
                    }
                }
            )
        } else if (url.indexOf('/discover/playlist') != -1) {
            let music = await request(config.music)
            store = configureStore(
                {
                    "playlist": {
                        "playlist": {
                            "playlist": JSON.parse(music)
                        }
                    }
                }
            )
        } else {
            store = configureStore()
        }

        console.log(JSON.stringify(store.getState()))
        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.req.url} context={{}}>
                    <App />
                </StaticRouter>
            </Provider>
        )

        await ctx.render('index', {
            root: html,
            state: store.getState()
        })
    } else {
        await next()
    }
}

export default clientRoute





