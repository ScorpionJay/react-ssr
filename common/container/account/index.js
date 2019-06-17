/**
 * account container
 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountComponent from "./component";
import { login } from "../login/action";
import { accountAction } from "./action";

const mapStateToProps = state => ({
  login: state.login,
  music: state.music
});

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(login, dispatch),
  accountAction: bindActionCreators(accountAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountComponent);
