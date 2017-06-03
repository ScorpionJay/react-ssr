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

export function homeAction(d,page){
	return async dispatch => {
	 	// dispatch(spin());
	 	try{
	 		let data ={}
	 		let banner = await api( Config.bannerAPI )
	 		//let musicList = await api( `${Config.albumAPI}/${page}` )
	 		data.banner = banner
	 		//data.recommendMusics = [] page ===1 ? musicList.data.data : d.recommendMusics.concat( musicList.data.data )
		 	dispatch(home(data))
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



