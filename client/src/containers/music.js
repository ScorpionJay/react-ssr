import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Nav from '../components/common/Nav'
import Tab from './tab'

class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
  }

  render() {
    const { dispatch,data,login } = this.props
    return (
      <div className='root'>

        <Tab name='我的音乐'/>

        <div className="container">
         TODO122
        </div>

        <Nav/>

      </div>
    )
  }
}

function map(state) {
  return {
    data: state.home.home,
    login: state.account.login
  }
}

export default connect(map)(App)
