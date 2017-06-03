/**
 * （歌单）专辑列表组件
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { albumListAction,scrollTopAction } from '../actions/album'
import RecommendList from '../components/music/recommendList'

class PlayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount(){
    const { dispatch,data,scrollTop } = this.props
    if( data.data ){
      // 计算有问题
      this.refs.container.scrollTop = scrollTop>0 ? scrollTop + this.refs.container.clientHeight / 2 - 50 : 0
    }else{
      dispatch(albumListAction(data,this.state.page))
    }
  }

  // 记录当前div滚动高度，以便返回时复原
  scrollTopHandler(){
    const { dispatch } = this.props
    dispatch(scrollTopAction(this.refs.container.scrollTop))
  }

  scroll(){
    const { dispatch,data } = this.props
    if( this.refs.container.scrollTop + this.refs.container.clientHeight ===  this.refs.container.scrollHeight){
      // 这里有问题
      dispatch(albumListAction(data))
    }
  }

  render() {
    const { data} = this.props
    return (
        <div  className='container' onScroll={()=>this.scroll() } ref='container'>
            <RecommendList data={data.data} scrollTop={()=>this.scrollTopHandler()}  history={this.props.history} />
        </div>
    )
  }
}

function map(state) {
  return {
    data: state.album.albumList,
    scrollTop: state.album.scrollTop
  }
}

export default connect(map)(PlayList)
