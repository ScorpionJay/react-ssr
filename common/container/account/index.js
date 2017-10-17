/**
 * 帐号
 */

import React, { Component } from 'react'

import Tab from '../../component/common/tab'
import Nav from '../../component/nav/nav'

import { connect } from 'react-redux'


class App extends Component {

	render() {
		return (
		
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Tab name='帐号' history={this.props.history} beat={this.props.music.controll === 'play'} />
				
					<div className='container'>TODO</div>
				
				<Nav />
			</div>
			
		)
	}

}

function map(state) {
	return {
		music: state.music,
	}
}

export default connect(map)(App)
