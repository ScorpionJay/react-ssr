import React, { Component, PropTypes } from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../client/src/stores'
import { Router,StaticRouter } from 'react-router'

import App from '../client/src/app'

const store = configureStore()
const clientRoute = async (ctx,next) => {
        const context = {}
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                    <StaticRouter location={ctx.req.url} context={context}>
                        <App/>
                    </StaticRouter>
                </Provider>
            ),
            state: store.getState()
        })
        await next()
}

export default clientRoute





