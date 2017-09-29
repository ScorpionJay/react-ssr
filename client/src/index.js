/**
* index.js
*/
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'
import { BrowserRouter,Route } from 'react-router-dom'

import App from './app'

import './sass/main.scss'

// 渲染
render(
  <Provider store={configureStore(window.REDUX_STATE)}>
    <BrowserRouter>
      <Route  path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)





import { AppContainer } from 'react-hot-loader';

const renderIndex = Component => {
  render(
  	 <AppContainer>
	<Provider store={configureStore(window.REDUX_STATE)}>
	    <BrowserRouter>
	      <Route  path="/" component={App} />
	    </BrowserRouter>
	  </Provider>

    </AppContainer>,
    document.getElementById('root')
  );
};

// renderIndex(App);

if (module.hot) {
  module.hot.accept(() => renderIndex(Root));
}
