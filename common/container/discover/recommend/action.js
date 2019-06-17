/**
 * recommend action
 */

import Config from "../../../config";
import { spin, spinHidden } from "../../../action/spin";
import api from "../../../util/api";

export const RECOMMEND = "RECOMMEND";

const recommend = obj => {
  return { type: RECOMMEND, obj };
};

export function recommendAction() {
  return async dispatch => {
    dispatch(spin());
    try {
      let data = {};
      let banner = await api(Config.bannerAPI);
      let musicList = await api(Config.musicListAPI);
      data.banner = banner;
      data.recommendMusics = musicList;
      dispatch(recommend(data));
      dispatch(spinHidden());
    } catch (error) {
      console.log("error", error);
      dispatch(spinHidden());
    }
  };
}
