/**
 * account container
 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Component from "./component";
import { login } from "../login/action";

const mapStateToProps = state => ({
  login: state.login,
  music: state.music
});

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(login, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
