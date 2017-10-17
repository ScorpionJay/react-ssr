/**
 * 播放组件
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import { PlayBtn, StopBtn, ListBtn, PreBtn, NextBtn } from '../../component/music/musicBtn'
// import 'rc-slider/assets/index.css'
import { currentMusicAPI, changetimeAPI, controllAPI, changeMusicAPI } from './action'

import Format from '../../util/format'

class Play extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props
    const { currentMusic } = this.props.music
    const { currentTime } = this.props.music.time
    const duration = currentMusic.duration
    this.state = {
      slider: duration ? currentTime / duration * 100 : 0,
      playList: false
    };
  }

  componentDidMount() {
    this.setState({
      krcHeight: this.refs.krcContainer.offsetHeight / 2,
      krcItem: this.refs.krcItem.offsetHeight
    })
    const { currentMusic, firstTime } = this.props.music
    const id = this.props.match.params.id
    if (id && currentMusic.hash !== id) {
      this.props.dispatch(currentMusicAPI(id, firstTime))
    }
  }

  componentWillReceiveProps() {
    const { currentTime } = this.props.music.time
    const duration = this.props.music.currentMusic.duration
    this.setState({
      slider: duration === 0 ? 0 : currentTime / duration * 100
    })
  }

  musicControll() {
    const { controll, currentMusic } = this.props.music
    // no music
    if (currentMusic.hash === '') return
    let status = controll === 'play' ? 'pause' : 'play'
    this.props.dispatch(controllAPI(status))
  }


  changeSlider(value) {
    const { currentTime } = this.props.music.time
    const duration = this.props.music.currentMusic.duration
    if (!duration) return
    this.setState({
      slider: value
    })

    this.props.dispatch(changetimeAPI({
      currentTime: value / 100 * duration,
      changeTimeFlag: true
    }))

  }

  playMusic(id) {
    const { currentMusic } = this.props.music
    if (currentMusic.hash !== id) {
      this.props.dispatch(currentMusicAPI(id))

    }
  }

  goBack() {
    const { dispatch, album, history } = this.props
    if (album.list.length > 1) {
      history.goBack()
    } else {
      history.push('/')
    }
  }

  render() {
    const { data, krc, time, controll, currentMusic, musicList } = this.props.music
    const { currentTime } = this.props.music.time
    const duration = this.props.music.currentMusic.duration
    let imgU = currentMusic.imgUrl.replace('{size}', 400)

    let krc2 = currentMusic.krc.filter((item) =>
      currentTime > item.time
    )
    let s = krc2.pop()
    s = s ? s : {
      time: 0,
      str: '',
      index: 0
    }

    return (
      <div style={{ display: 'flex' }} >

        <div style={{ zIndex: 1, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
          <div style={{ display: 'flex', maxWidth: '640px', widtt: '100%', height: '100%', margin: '0 auto', backgroundImage: `url(${imgU})`, backgroundSize: 'cover', filter: 'blur(3rem)', WebkitFilter: 'blur(3rem)', backgroundPosition: '50%' }}>
          </div>
          <div style={{ zIndex: 3, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, opacity: '0.7', backgroundColor: '#555' }}></div>
        </div>

        <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>

          <div className="header" style={{ backgroundColor: 'transparent', color: '#fff', display: 'flex', justifyContent: 'space-between', padding: '.6rem 1rem', borderBottom: '.01rem solid #999' }}>
            <div onClick={() => this.goBack()} style={{ display: 'flex', flex: 1 }}>返回</div>
            <div style={{ display: 'flex', flex: 3, justifyContent: 'center' }}>{currentMusic.songName}</div>
            <div style={{ display: 'flex', flex: 1 }}></div>
          </div>

          <div className="container" style={{ overflowY: 'hidden', textAlign: 'center', color: '#aaa', padding: '3rem 0', fontSize: '1.2rem' }} onClick={() => this.setState({ playList: false })} ref='krcContainer'>
            {
              currentMusic.krc.map((item, index) =>
                <div key={index} style={Object.assign({ transform: 'translateY(' + (this.state.krcHeight - (s.index + 1) * this.state.krcItem) + 'px)', transition: 'transform .5s ease', padding: '1rem 0', height: '2rem' }, s.time === item.time ? { color: '#fff' } : {})} ref='krcItem'>
                  {item.str}
                </div>
              )
            }
          </div>

          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '0 1rem', color: '#fff' }}> {Format.formatSeconds(currentTime)} </div>
              <div style={{ display: 'flex', flex: 1 }}>
                <Slider onChange={(value) => this.changeSlider(value)} step={0.1} value={this.state.slider} onBeforeChange={() => this.musicControll('pause')} onAfterChange={() => this.musicControll('play')} />
              </div>
              <div style={{ padding: '0 .5rem', color: '#fff' }}> {Format.formatSeconds(duration)} </div>
            </div>

            <div style={{ display: 'flex', padding: '1rem', justifyContent: 'space-between', }}>
              <div onClick={() => console.log('...')}> </div>
              <div onClick={() => this.props.dispatch(changeMusicAPI(musicPlayList, currentMusic, 'pre'))}><PreBtn /></div>
              <div onClick={() => this.musicControll()}>{controll === 'play' ? <StopBtn /> : <PlayBtn />}</div>
              <div onClick={() => this.props.dispatch(changeMusicAPI(musicPlayList, currentMusic))}><NextBtn /></div>
              <div onClick={() => this.setState({ playList: true })}><ListBtn /></div>
            </div>
          </div>


          <div className="container" style={Object.assign({ position: 'fixed', bottom: '0', left: '0', right: '0', maxHeight: '30rem', maxWidth: '640px', margin: '0 auto', }, this.state.playList ? { display: 'block' } : { display: 'none' })}>
            <div style={{ minHeight: '25rem', maxWidth: '640px', widtt: '100%', height: '100%', backgroundColor: '#fff', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', fontSize: '1.5rem', padding: '1rem', borderBottom: '.01rem solid #ddd' }}>
                播放列表  {currentMusic.hash === '' ? '(0)' : `(${musicList.length})`}
              </div>
              {
                musicList.map((item, index) =>
                  <div key={index} style={currentMusic.hash === item.hash ? { color: '#ce3d3e' } : {}} >
                    <Item {...item} play={(id) => this.playMusic(id)} />
                  </div>
                )
              }
            </div>

          </div>
        </div>

      </div>
    )
  }
}

/**
* 播放列表详情组件
*/
class Item extends Component {
  render() {
    const { name, hash, play } = this.props
    return (
      <div onClick={() => play(hash)} style={{ padding: '1rem' }}>
        {name}
      </div>
    )
  }
}

function map(state) {
  return {
    music: state.music,
    album: state.album.album,
    // currentMusic: state.music.currentMusic,
    // controll:state.music.controll,
    // time:state.music.time,
    // home: state.home.home,
    // firstTime:state.music.firstTime
  }
}

export default connect(map)(Play)


