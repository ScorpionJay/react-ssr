import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'
import { BrowserRouter,Route } from 'react-router-dom'
import App from './app'

// 拿到后台返回放在全局的state
const store = configureStore(window.REDUX_STATE)

import './sass/main.scss'

// 渲染
render(
  <Provider store={store}>
    <BrowserRouter>
      <Route  path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
