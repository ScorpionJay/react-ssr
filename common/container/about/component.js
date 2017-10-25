/**
 * account component
 */

import React, { Component } from 'react'
import Tab from '../../component/common/tab'
import Nav from '../../component/nav/nav'

import './style.scss'

export default class AboutComponent extends Component {

    logout() {
        this.props.loginAction({})
        localStorage.clear()
        this.props.history.replace('/')
    }

    render() {
        let { login, history, loginAction } = this.props
        return (

            <div style={{ display: 'flex', flexDirection: 'column' }} className='account'>
                <Tab name='关于' back={true} history={history} beat={this.props.music.controll === 'play'} />

                <div className='container'>

                    <div className='logo'>react demo</div>

                    <Item value='0.0.1' name='当前版本' />
                    <Item name='帮助与反馈' />

                </div>

            </div>

        )
    }

}


const Item = ({ value, name }) => (
    <div className='item'>
        <div>{name}</div>
        <div>{value}</div>
    </div>
)