/*
 * 帐号组件
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Nav from '../components/common/Nav'
import Tab from './tab'
import {logoutAction,accountAction} from '../actions/account'

class Account extends Component {

  componentDidMount(){
    const { dispatch,token } = this.props
    this.props.token ? dispatch(accountAction(token)) : ''
  }

  render() {
    const { dispatch,data,controll,user } = this.props
    return (
      <div className='root'>

        <Tab name='帐号'/>

        <div className="container">
          {
            this.props.token ? 
            <div>
              <div>{user.username}</div>
              <div onClick={()=>dispatch(logoutAction()) } style={{display:'flex',flex:1,padding:'.3rem',justifyContent:'center',border:'.1rem solid #999',margin:'.5rem'}}>退出</div>
              
            </div>  
            :
            <Link to='/login' style={{display:'flex',flex:1,padding:'.3rem',justifyContent:'center',border:'.1rem solid #999',margin:'.5rem'}}>登录</Link>
          }
          
          

          

          

        </div>

        <Nav/>

      </div>
    )
  }
}

function map(state) {
  return {
    token: state.account.token,
    user: state.account.user,
    controll:state.music.controll
  }
}

export default connect(map)(Account)
