import React, { Component } from 'react'
import './tab.scss'

import Beat from '../music/beat'

// export default class Tab extends Component { 

//   render() {
//    console.log(this.props.history)
//     return (
//         <div className='tab'>
//             <div onClick={()=>this.props.history.goBack()}>返回</div>
//             <div>{this.props.name}</div>
//             <div></div>
//         </div>
//     )
//   }
// }


const Tab = ({ back, history, name, beat }) => (
  <div className='tab'>
    {
      back ?
        <div onClick={() => history.goBack()}>返回</div>
        :
        <div></div>
    }
    <div>{name}</div>
    <div onClick={() => history.push('/play')}>
      <Beat beat={beat} />
    </div>
  </div>
)

export default Tab