/**
 * playlist reducer
 */

import { combineReducers } from "redux";
import { PLAYLIST, SCROLLTOP } from "./action";
let vo = {
  playlist: [],
  page: -1
};

function playlist(state = vo, action) {
  switch (action.type) {
    case PLAYLIST:
      return action.obj;
    default:
      return state;
  }
}

function scrollTop(state = 0, action) {
  switch (action.type) {
    case SCROLLTOP:
      return action.obj;
    default:
      return state;
  }
}

const Reducers = combineReducers({
  playlist,
  scrollTop
});

export default Reducers;
