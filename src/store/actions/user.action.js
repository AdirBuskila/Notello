// import { userService } from '../services/user.service.js'


export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            console.log(user,'user');
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('cannot login',err);
        }
    };
}
export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('cannot signup',err);
        }
    }
}
export function logout() {
    return async (dispatch) => {
        try {
            const loggedOut = await userService.logout()
            const action = { type: 'SET_USER', user: null }
            dispatch(action)
        } catch (err) {
            console.log('cannot logout',err);
        }
    }
}
