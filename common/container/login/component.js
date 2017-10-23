/**
 * login component
 */

import React, { Component } from 'react'
// import Tab from '../tab'
import Validate from '../../util/validate'
import './style.scss'

import Alert from '../../component/alert'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mobile: '18521303750',
            pwd: '1111qqqq',
            pwdType: false,
            message:null
        }
    }

    clear() {
        this.setState({ mobile: '' })
        this.refs.mobile.focus()
    }

    pwdShow() {
        this.refs.pwd.focus()
        this.setState({
            pwdType: !this.state.pwdType
        })

        this.refs.pwd.type = this.state.pwdType ? 'password' : 'text'
        console.log(this.state)
    }

    callback(v){
        const { history } = this.props
        if( v ){
            history.replace('/')
        }else{
            this.setState({message:'手机号或密码错误'})
            setTimeout(()=>this.setState({message:null}) ,1000)
        }
    }

    login() {
        const { loginAction } = this.props
        console.log(this.state)
        console.log ( Validate.mobile(this.state.mobile) )
        console.log(this.state.pwd)

        if( !Validate.mobile(this.state.mobile) ){
            this.setState({message:'请输入正确的手机号'})
            setTimeout(()=>this.setState({message:null}) ,1000)
        }else  if( !Validate.pwd(this.state.pwd) ){
            this.setState({message:'请输入正确的密码'})
            setTimeout(()=>this.setState({message:null}) ,1000)
        }else{
            let mobile = this.state.mobile
            let pwd = this.state.pwd
            loginAction( mobile, pwd ,(v) =>this.callback(v))
        } 
    }

    render() {
        return (
            <div className='login'>
                
                {
                    this.state.message ? <Alert data={this.state.message} /> : null
                }
                

                <div className='circle'>
                    
                    <div className='login-tab'>
                        <div onClick={()=>this.props.history.goBack()}><i  className='back'></i></div>
                        <div>登录</div>
                        <div></div>
                    </div>

                    <div className='pic'>
                        <div>
                            <img src={require('./image/logo.jpg')} />
                        </div>
                    </div>
                    <div className='circle2'>
                    </div>
                </div>


                <div className='item'>
                    <input className='mobile' type='mobile' placeholder='请输入您的手机号' maxLength='11'
                        value={this.state.mobile}
                        onChange={(e) => this.setState({ mobile: e.target.value })}
                        ref='mobile' />
                    <i className='mobile-icon'></i>
                    <i className={this.state.mobile !== '' ? 'clear' : ''} onClick={() => this.clear()}></i>
                </div>
                <div className='item'>
                    <input type='password' className='pwd' placeholder='请输入您的登录密码'
                        value={this.state.pwd}
                        onChange={(e) => this.setState({ pwd: e.target.value })}
                        ref='pwd' />
                    <i className='pwd-icon'></i>
                    <i className={this.state.pwdType ? 'pwd-eye-open' : 'pwd-eye-close'} onClick={() => this.pwdShow()} ></i>
                </div>

                <div className='forget'>忘记密码？</div>

                <div className='login-btn' onClick={() => this.login()}>登录</div>
                <div className='register-btn'>注册</div>



            </div>
        )
    }

}



