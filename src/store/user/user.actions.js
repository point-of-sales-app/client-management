import {
    REGISTER
} from './user.actionTypes';
import axios from 'axios';

export const register = (payload) => {
    return dispatch => {
        axios.post('http://localhost:3001/registration', {
            name: payload.name,
            email: payload.email,
            password: payload.password
        }).then(data => {
            dispatch(registerSuccess(data.data.data));
        }).catch(err => {
            console.log('action error')
        }) 
    }
}

const registerSuccess = (payload) => {
    return {
        type: REGISTER,
        payload
    }
}

export const login = (email, password) => {
    return dispatch => {
        axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        }).then(data => {
            localStorage.setItem('token', data.data.user.token)
            window.location.href = '/';
        }).catch(err => {
            console.log('action error')
            console.log(err)
        }) 
    }
}
