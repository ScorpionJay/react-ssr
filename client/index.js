/**
 * @author Jay
 * @date  2017-8-1
 * @description client index
 */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import App from "../common/container/app";
import "../common/scss/main.scss";
import configureStore from "../common/store";

render(
  <Provider store={configureStore(window.REDUX_STATE)}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

import { AppContainer } from "react-hot-loader";

const renderIndex = () => {
  render(
    <AppContainer>
      <Provider store={configureStore(window.REDUX_STATE)}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept(() => renderIndex(Root));
}
