/**
* album action
*/

import Config from '../config'
import { spin,spinHidden } from './spin'
import api from '../api'
export const ALBUMLIST = 'ALBUMLIST'
export const ALBUMDETAIL = 'ALBUMDETAIL'
export const SCROLLTOP = 'SCROLLTOP'

const albumList = (obj) =>{return {type: ALBUMLIST,obj}}
const albumDetail = (obj) =>{return {type: ALBUMDETAIL,obj}}
const scrollTop = (obj) =>{ return {type: SCROLLTOP,obj}}


export function albumListAction(d){
	return async dispatch => {
	 	dispatch(spin())
	 	try{
	 		let page = d.page || 1
	 		let data = {}
	 		let musicList = await api( `${Config.albumAPI}/${page}` )
	 		data.data = page ===1 ? musicList.data.data : d.data.concat( musicList.data.data )
		 	data.page =  musicList.data.page+1
		 	dispatch(albumList(data))
		 	dispatch(spinHidden())
		 }catch(error){
			console.log('error',error)
		}
	}
}


export function albumDetailAction(id){
	return async dispatch => {
	 	dispatch(spin());
	 	try{
	 		let data = await api( `${Config.albumDetailAPI}/${id}` );
	 		console.log(data)
	 		let d = {
	 			list:data.data.data.list,
	 			info:data.data.data.info
	 		}
		 	dispatch(albumDetail(d))
		 	dispatch(spinHidden())
		}catch(error){
			console.log('error',error)
		}
	}
}

export function scrollTopAction(obj){
	return  dispatch => {
	 	dispatch(scrollTop(obj))
	}
}

