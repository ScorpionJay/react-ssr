/**
 * login container
 */


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from './component'
import { loginAction } from './action'


const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => ({
    loginAction: bindActionCreators(loginAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)