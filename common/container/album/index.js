/**
 * 专辑容器
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { albumAction } from './action'

import Nav from '../../component/nav/nav'
import Tab from '../../component/common/tab'
import AlbumComponent from '../../component/album/album'

class Album extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		const id = this.props.match.params.id
		dispatch(albumAction(id))
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }} >

				<Tab name='歌单' back={true} history={this.props.history} beat={this.props.music.controll === 'play'} />

				<div className='container'>
					<AlbumComponent {...this.props} />
				</div>

				<Nav />

			</div>
		)
	}

}

function map(state) {
	return {
		data: state.album.album,
		music: state.music,
	}
}

export default connect(map)(Album)

