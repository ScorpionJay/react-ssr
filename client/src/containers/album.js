import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Album from '../components/music/album'
import { albumDetailAction } from '../actions/album'
import { musicBoxAddAPI,currentMusicAPI,changetimeAPI,controllAPI } from '../actions/music'
import Tab from './tab'

class App extends Component {

  componentDidMount(){
    const { dispatch,albumDetail } = this.props

    if( albumDetail.info.specialid != this.props.match.params.id){
      dispatch(albumDetailAction(this.props.match.params.id))
    }
  }

  musicBoxAdd(m){
    // browserHistory.push(`play/${m.hash}`)
  }

  render() {
    const { dispatch,albumDetail,login,controll,currentMusic } = this.props
    return (
      <div className='root'>
      
        <Tab name='歌单' back={()=>this.props.history.goBack()}  />
        
        <div className="container">
          <Album data={albumDetail} addMusic={(m) => this.musicBoxAdd(m)} currentHash={currentMusic.hash} history={this.props.history}/>
        </div>


      </div>
    )
  }
}

function map(state) {
  return {
    albumDetail: state.album.albumDetail,
    message: state.message.message,
    musicPlayList: state.music.musicPlayList,
    currentMusic: state.music.currentMusic,
    controll:state.music.controll
  }
}

export default connect(map)(App)
