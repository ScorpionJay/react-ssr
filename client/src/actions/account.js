/*
 * login action
 */

import Config from '../config'
import Storage from '../storage'
export const LOGIN = 'LOGIN'
export const USER = 'USER'
import { spin,spinHidden } from './spin'
export const LOGIN_ERROR = 'LOGIN_ERROR'
import {alert} from './message'
import api from '../api'

export const login = (token) => { return {type: LOGIN,token} }
export const user = (obj) => { return {type: USER,obj} }

export const loginAction = (username,password,redirect) => {
	return async dispatch => {
	 	dispatch(spin());
	 	try{
	 		let data = await api( Config.loginUrl,'post', {username,password} ,{'Content-Type': 'application/x-www-form-urlencoded'}  )

	 		dispatch(spinHidden())
	 		
	 		if(data.code !== 1){
               Storage.put('token',data.token)
               dispatch(login(data.token))
               // 页面跳转
               if (redirect) redirect()
            }else{
           	 dispatch(alert(data.message))
            }
		 }catch(error){
			console.log('error',error);
		}
	}
}

export const logoutAction = (redirect) => {
	// fetch login
	return dispatch => { 
    	// 持久化
       Storage.clear()
       
       dispatch(login(''))
       // 页面跳转
       if (redirect) redirect()
	}

}

export const accountAction = (token) => {
	return async dispatch => {
	 	try{
	 		let data = await api( Config.accountAPI,'post', {} ,{'Content-Type': 'application/x-www-form-urlencoded',token}  )
	 		dispatch(user(data))
		 }catch(error){
			console.log('error',error);
		}
	}
}