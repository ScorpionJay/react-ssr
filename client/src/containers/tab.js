/*
 * 页面tab组件
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Beat from '../components/music/beat'

class Tab extends Component {

  render() {
    return (
        <div className="header" style={{backgroundColor:'#ce3d3e',color:'#fff',display:'flex',justifyContent: 'space-between',padding:'0 1rem'}}>
          {
            this.props.back ? 
              <div onClick={()=>this.props.back()} style={{display:'flex',flex:1}}>返回</div>
              : 
              <div style={{display:'flex',flex:1}}></div>
          }

          <div style={{display:'flex',flex:1,justifyContent: 'center'}}>{this.props.name}</div>
          
          <Link style={{display:'flex',flex:1,justifyContent: 'flex-end'}}  to='/play'>
            <Beat  beat={this.props.controll === 'play'} />
          </Link>
        
        </div>
    )
  }
}

function map(state) {
  return {
    controll:state.music.controll
  }
}

export default connect(map)(Tab)
