import { LOGIN } from './action'

const inteState = {
   
}

const login = (state = inteState, action) => {
    switch (action.type) {
        case LOGIN:
            return action.obj
        default:
            return state
    }
}

export default login