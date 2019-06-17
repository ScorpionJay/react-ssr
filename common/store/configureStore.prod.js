import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducer";

import { login } from "../container/login/action";

const store = function(initialState) {
  let middlware = applyMiddleware(thunk);
  let store = createStore(reducers, initialState, middlware);

  if (typeof window != "undefined") {
    let storage = require("../util/storage").default;
    let token = storage.get("token");
    if (token) {
      store.dispatch(login(JSON.parse(token)));
    }
  }

  return store;
};

export default store;
