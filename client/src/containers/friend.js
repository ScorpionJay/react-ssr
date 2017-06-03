import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tab from './tab'

import Nav from '../components/common/Nav';
class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
  }
  render() {
    const { dispatch,data,login } = this.props
    return (
      <div className='root'>

        <Tab name='朋友'/>

        <div className="container">
          TODO
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
