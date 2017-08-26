/*
 * 推荐组件
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { homeAction } from '../actions/home'
import Slider from '../components/common/slider'
import RecommendList from '../components/music/recommendList'

class Recommod extends Component {

  componentDidMount(){
    const { dispatch,data} = this.props
    //if( !data.recommendMusics.length > 0){
     dispatch(homeAction(data,1))
    //}
  }

 // <div className='recommod'>
 //            <span style={{lineHeight: '1.6rem'}}>推荐歌单</span>
 //            <span className='arrow-right'></span>
 //          </div>
// <RecommendList data={data.recommendMusics.slice(0,6)} scrollTop={()=>{}}  history={this.props.history} />
  render() {
    const { dispatch,data} = this.props

    return (
        <div className='container'  ref='container'>
          
          <Slider data={data.banner} />

          <img src={require('../images/test.jpg')} />
           
         

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

export default connect(map)(Recommod)
