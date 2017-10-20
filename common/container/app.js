/**
 * 入口，顶层组件，
 * 一些共用的组件可以放在这里
 */


import React, { Component } from 'react'
import {  Route, Switch, Redirect, NavLink } from 'react-router-dom'
//import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import Nav from '../component/nav/nav'

import { Provider } from 'react-redux'
import configureStore from '../store'
const store = configureStore()

import Discover from './discover'
import My from './my'
import Friend from './friend'
import Account from './account'

import Bundle from '../component/bundle'

import Audio from '../component/music/audio'
import Album from './album/'
import Play from './play'
import Login from './login'

import Spin from '../component/common/spin'

// components load their module for initial visit

// const Discover = (match) => (
// 	<Bundle load={loadDiscover}>
// 		{(Discover) => <Discover {...match} />}
// 	</Bundle>
// )

// const My = (match) => (
// 	<Bundle load={loadMy}>
// 		{(My) => <My {...match} />}
// 	</Bundle>
// )

// const Friend = (match) => (
// 	<Bundle load={loadFriend}>
// 		{(Friend) => <Friend {...match} />}
// 	</Bundle>
// )

// const Account = (match) => (
// 	<Bundle load={loadAccount}>
// 		{(Account) => <Account {...match} />}
// 	</Bundle>
// )


// export default class App extends Component {

// 	componentDidMount() {
// 		// preloads the rest
// 		// loadDiscover(() => { })
// 		// loadMy(() => { })
// 		// loadFriend(() => { })
// 		// loadAccount(() => { })
// 	}

// 	render() {
// 		return (
// 			<Provider store={store}>
// 				<MainContainer {...this.props} />
// 			</Provider>
// 		)
// 	}

// }


import { musicBoxAddAPI, currentMusicAPI, changetimeAPI, controllAPI, changeMusicAPI } from './play/action'
import { connect } from 'react-redux'

class Main extends Component {

	getCur(t) {
		const { dispatch } = this.props
		dispatch(changetimeAPI({
			currentTime: t.currentTime,
			changeTimeFlag: false
		}))
	}

	changeTime() {
		dispatch(changetimeAPI({
			currentTime: t.currentTime,
			changeTimeFlag: false
		}))
	}

	changeMusic() {
		const { dispatch, musicList, currentMusic } = this.props
		dispatch(changeMusicAPI(musicList, currentMusic))
	}

	controllMusic() {
		const { dispatch } = this.props
		dispatch(controllAPI('pause'))
	}


	render() {
		const { dispatch, musicList, currentMusic, time, controll } = this.props
		return (
				<div className='app-container'>
					<Spin spin={this.props.spin} />

					<Audio data={currentMusic}
							getCur={(e) => this.getCur(e)}
							time={time}
							changeTime={() => this.changeTime()}
							changeMusic={() => this.changeMusic()}
							controllMusic={() => this.controllMusic()}
							controll={controll} />

					<div className='app-content'>
						<Switch>
							<Route exact path='/' render={() => (<Redirect to="/discover" />)} />
							<Route path='/*/album/:id' component={Album} />
							<Route path='/discover' component={Discover} />
							<Route path='/my' component={My} />
							<Route path='/friend' component={Friend} />
							<Route path='/account' component={Account} />
							<Route path='/play/:id' component={Play} />
							<Route path='/play' component={Play} />
							<Route path='/Login' component={Login} />
							<Route render={() => (<Redirect to="/discover" />)} />
						</Switch>
					</div>
				</div>
		)
	}
}

function map(state) {
	return {
		time: state.music.time,
		spin: state.spin.spin,
		// message: state.message.message,
		musicList: state.music.musicList,
		currentMusic: state.music.currentMusic,
		controll: state.music.controll
	};
}
const MainContainer = connect(map)(Main)
export default MainContainer
