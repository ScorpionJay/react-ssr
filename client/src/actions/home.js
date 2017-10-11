/**
* home action
*/

import Config from '../config'
import { spin,spinHidden } from './spin'
import api from '../api'

export const HOME = 'HOME'
export const RECOMMENDMUSIC = 'RECOMMENDMUSIC'
export const SCROLLTOP = 'SCROLLTOP'

const home = (obj) =>{ return {type: HOME,obj}}
const scrollTop = (obj) =>{ return {type: SCROLLTOP,obj}}

import request from 'request'




// 封装 Ajax，返回一个 Promise
const requestP = (url) => (
  new Promise(function(resolve, reject) {
      request(url ,function (error, response, body) {
              if (!error && response.statusCode == 200) {
                 resolve(body)
              }
      })
  })
)

import configureStore from '../stores'

export function homeAction(){
	return async dispatch => {
	 	// dispatch(spin());
	 	try{
	 		const store = configureStore({})
	 		let data ={}
	 		console.log(1)
	 		if(typeof window == 'undefined'){
				let a = await requestP('http://localhost:8889/banner')
				console.log(2)
				data.banner = JSON.parse(a)
		 		//data.recommendMusics = [] page ===1 ? musicList.data.data : d.recommendMusics.concat( musicList.data.data )
			 	dispatch(home(data))

	 		}else{
	 			console.log(3)
	 			let banner = await api( Config.bannerAPI )
		 		//let musicList = await api( `${Config.albumAPI}/${page}` )
		 		data.banner = banner
		 		//data.recommendMusics = [] page ===1 ? musicList.data.data : d.recommendMusics.concat( musicList.data.data )
			 	dispatch(home(data))
	 		}
	 		

	 		
		 	// dispatch(spinHidden());
		 }catch(error){
			console.log('error',error);
		}
	}
}

export function scrollTopAction(obj){
	return  dispatch => {
	 	dispatch(scrollTop(obj));
	}
}



