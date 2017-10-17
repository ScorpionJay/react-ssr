/**
 * discover index
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import Bundle from '../../component/bundle'

import Recommend from './recommend'
import Playlist from './playlist'
import Rank from './rank'
import Mv from './mv'

import Nav from '../../component/nav/nav'


import { connect } from 'react-redux'

import './index.scss'

// const Recommend = (match) => (
//     <Bundle load={loadRecommend}>
//         {(Recommend) => <Recommend {...match} />}
//     </Bundle>
// )

// const Playlist = (match) => (
//     <Bundle load={loadPlaylist}>
//         {(Recommend) => <Recommend {...match} />}
//     </Bundle>
// )

// const Rank = (match) => (
//     <Bundle load={loadRank}>
//         {(Recommend) => <Recommend {...match} />}
//     </Bundle>
// )

// const Mv = (match) => (
//     <Bundle load={loadMv}>
//         {(Recommend) => <Recommend {...match} />}
//     </Bundle>
// )


// export default class App extends Component {

// 	// componentDidMount() {
// 	//     // preloads the rest
// 	//     loadHome(() => {})
// 	//     loadAbout(() => {})
// 	//     loadBlog(() => {})
// 	//     loadBlogDetail(() => {})
// 	// }

// 	render() {
//         console.log(this)
// 		return (
//              <Switch>
//                 <Route exact path='/' render={()=>(<Redirect to="/recommend"/>)} />
//                 <Route path={`${url}/recommend`} render={()=>(<div>123</div>)}  />
//                 <Route render={()=><p>404</p>} />
//             </Switch>
// 		)
// 	}

// }

import Tab from '../../component/common/tab'

const tabs = [
    { name: '个性推荐', url: 'recommend' },
    { name: '歌单', url: 'playlist' },
    { name: '排行榜', url: 'rank' },
    { name: 'MV', url: 'mv' }
]

class discoverIndex extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            tabIndex: 0,
            
        })
    }


    componentDidMount() {
        let i = tabs.findIndex((i) => this.props.location.pathname.indexOf(i.url) != -1)
        this.setState({
            tabIndex: i === -1 ? 0 : i
        })
    }

    //let a = tabs.findIndex((i) => match.url.indexOf( i.url ) !== -1 )
    //this.setState({tabIndex: 0})

    changeTab(index) {
        this.props.history.push('/discover/' + tabs[index].url)
        this.setState({ tabIndex: index })
    }

    render() {
        const { history, match, music } = this.props
        return (
            <div className='discover'>

                <Tab name='首页' history={history} beat={music.controll === 'play'} />

                <div className='nav'>
                    <div className='nav-tab'>
                        {
                            tabs.map((obj, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => this.changeTab(index)}
                                    >
                                        {obj.name}
                                    </div>
                                )
                            }

                            )
                        }
                    </div>
                    <div className="highlight" style={{ transform: `translateX(${this.state.tabIndex}00%)` }}></div>
                </div>


                <div className='discover'>
                    <Switch>
                        <Route exact path={match.url} render={() => (<Redirect to={`${match.url}/recommend`} />)} />
                        <Route path={`${match.url}/recommend`} component={Recommend} />
                        <Route path={`${match.url}/playlist`} component={Playlist} />
                        <Route path={`${match.url}/rank`} component={Rank} />
                        <Route path={`${match.url}/mv`} component={Mv} />
                        <Route render={() => (<Redirect to={`${match.url}/recommend`} />)} />
                    </Switch>
                </div>



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

export default connect(map)(discoverIndex)