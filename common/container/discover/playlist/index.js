/**
 * 歌单列表
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../../../component/music/list'
import { playlistAction, scrollTopAction } from './action'

class Playlist extends Component {

	componentDidMount() {
		const { dispatch, data, scrollTop } = this.props
		if (data.playlist.length > 1) {
			this.refs.container.scrollTop = scrollTop
		} else {
			dispatch(playlistAction(data))
		}
	}


	shouldComponentUpdate(nextProps, nextState){
		return this.props.data !== nextProps.data
	}

	scroll() {
		const { dispatch, data } = this.props
		// console.log('offsetHeight',this.refs.container.offsetHeight)
		// console.log('scrollHeight',this.refs.container.scrollHeight)
		// console.log('clientHeight',this.refs.container.clientHeight)
		// console.log('scrollTop',this.refs.container.scrollTop)    
		if (this.refs.container.scrollTop + this.refs.container.clientHeight === this.refs.container.scrollHeight) {
			dispatch(playlistAction(data))
		}

		if( Math.abs(this.props.scrollTop - this.refs.container.scrollTop) > 100 ){
			setTimeout(dispatch(scrollTopAction(this.refs.container.scrollTop)),200)
		}
		
	}


	render() {
		return (
			<div onScroll={() => this.scroll()} ref='container' className='container'>
				<List {...this.props} data={this.props.data.playlist} />
			</div>
		)
	}

}

function map(state) {
	return {
		data: state.playlist.playlist,
		scrollTop: state.playlist.scrollTop,
	}
}

export default connect(map)(Playlist)