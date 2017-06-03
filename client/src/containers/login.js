import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginAction } from '../actions/account'
import { Link } from 'react-router-dom'
import {alert} from '../actions/message'

class Login extends Component {

  login(e){
    const { dispatch } = this.props
    // validate
    if(  !this.refs.username.value ){
      dispatch(alert('请输入用户名'))
      return
    }else if(  !this.refs.password.value ){
      dispatch(alert('请输入密码'))
      return
    }
    //const page = this.props.params.page
    dispatch(loginAction(this.refs.username.value,this.refs.password.value,()=>{
       // this.props.history.push(page ? page.replace(/-/g,'/') : '/')
       this.props.history.push('/discover')
    }))
  }

  render() {
    const { dispatch,data,message } = this.props
    return (
      <div className='loginC'>

          <div className="header" style={{backgroundColor:'#ce3d3e',color:'#fff',display:'flex',justifyContent: 'space-between',padding:'0 1rem'}}>
            <div onClick={()=> this.props.history.goBack()} style={{display:'flex',flex:1}}>返回</div>
            <div style={{display:'flex',flex:1,justifyContent: 'center'}}>登录</div>
            <Link style={{display:'flex',flex:1,justifyContent: 'flex-end'}}  to='/play'>
            </Link>
          </div>

           <div className="container">
            
                <div className="logForm">
                    <ul>
                      <li className="formgroup">
                        <div className="forminput">
                          <span className="login-form-username"></span><input className="input" type="text" name="user_name" placeholder="请输入手机号" maxLength="11" ref='username'/>
                        </div>
                      </li>
                      <li className="formgroup">
                        <div className="forminput">
                          <span className="login-form-password"></span><input id="password" className="input" type="password" name="password"  onfocus="this.type='password'" autocomplete="off" placeholder="请输入密码" ref='password'/>
                        </div>
                      </li>
                      <li className="formgroup btn">
                        <button id="submit_login" type="submit" className="ui-btn ui-btn-big" onClick= {(e) => this.login(e)}> <span>登录</span> </button>
                      </li>
                      <li className="formgroup">
                        <em className="fr"><Link to="register">注册</Link></em>
                      </li>
                    </ul>
                </div>
               
            
          </div>



      </div>
    )
  }
}

function map(state) {
  return {
    data: state.home.fetchList,
    message:state.message.message
  }
}

export default connect(map)(Login)
