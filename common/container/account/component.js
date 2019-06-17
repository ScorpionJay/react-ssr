/**
 * account component
 */

import React, { Component } from "react";
import Tab from "../../component/common/tab";
import Nav from "../../component/nav/nav";

import "./style.scss";

export default class AccountComponent extends Component {
  logout() {
    this.props.loginAction({});
    localStorage.clear();
    this.props.history.replace("/");
  }

  componentDidMount() {
    //  use token to get data
    let { login } = this.props;
    if (login.token) {
      this.props.accountAction(login.token);
    }
  }

  render() {
    let { login, history, loginAction } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="account"
      >
        <Tab
          name="帐号"
          history={history}
          beat={this.props.music.controll === "play"}
        />

        <div className="container">
          <Item icon="icon" name="我" fun={() => history.push("/about")} />
          <Item icon="icon" name="设置" fun={() => history.push("/about")} />
          <Item icon="icon" name="关于" fun={() => history.push("/about")} />

          {login.token ? (
            <div className="btn" onClick={() => this.logout()}>
              退出
            </div>
          ) : (
            <div className="btn" onClick={() => history.replace("/login")}>
              登录
            </div>
          )}
        </div>

        <Nav />
      </div>
    );
  }
}

const Item = ({ icon, name, fun }) => (
  <div className="item" onClick={() => fun()}>
    <div>{name}</div>
    <div>
      <i className="rightArrow"></i>
    </div>
  </div>
);
