import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { recommendAction } from "./action";
import Slider from "../../../component/slider/slider";
import List from "../../../component/music/list";
import "./index.scss";

class Recommend extends Component {
  componentDidMount() {
    const { dispatch, data } = this.props;
    if (data.banner[0].imgurl === "") {
      dispatch(recommendAction());
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    const { data } = this.props;
    return (
      <div className="recommend">
        <Slider data={this.props.data.banner} />
        <div className="recommend-tab">推荐歌单</div>
        <div className="container">
          <List {...this.props} data={this.props.data.recommendMusics} />
        </div>
      </div>
    );
  }
}

function map(state) {
  return {
    data: state.recommend.recommend
  };
}

export default connect(map)(Recommend);
