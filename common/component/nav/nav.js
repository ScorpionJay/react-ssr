/**
 * 导航组件
 */
import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";

const Nav = () => (
  <div className="app-nav">
    <NavLink to={"/discover"} activeClassName="active">
      发现音乐
    </NavLink>
    <NavLink to={`/my`} activeClassName="active">
      我的音乐
    </NavLink>
    <NavLink to={`/friend`} activeClassName="active">
      朋友
    </NavLink>
    <NavLink to={`/account`} activeClassName="active">
      帐号
    </NavLink>
  </div>
);

export default Nav;
