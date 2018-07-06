import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    REGISTER_LOADING,
} from './user.actionTypes';
import axios from 'axios';
import swal from 'sweetalert2';

export const register = (payload) => {
    return dispatch => {
        swal({
            text: 'Silakan tunggu sebentar',
            onOpen: () => {
                swal.showLoading()
                dispatch(registerLoading());
                axios.post('http://localhost:3001/registration', {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password
                }).then(data => {
                    swal({
                        type: 'success',
                        title: 'Berhasil',
                        text: 'Silakan masuk ke dalam akunmu',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(data => {
                        window.location.href = '/';
                    })
                    dispatch(registerSuccess(data.data.data));
                }).catch(err => {
                    dispatch(registerError());
                    console.log('action error')
                })
            }
        })
    }
}

const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload
    }
}

const registerLoading = () => {
    return {
        type: REGISTER_LOADING,
    }
}

const registerError = () => {
    return {
        type: REGISTER_ERROR,
    }
}

export const login = (payload) => {
    return dispatch => {
        swal({
            text: 'Mohon tunggu sebentar...',
            onOpen: () => {
                swal.showLoading()
                axios.post('http://localhost:3001/login', {
                    email: payload.email,
                    password: payload.password
                }).then(data => {
                    if (data.status === 401) {
                        swal({
                            type: 'error',
                            title: 'E-mail atau password yang kamu masukkan salah',
                            text: 'Silakan coba lagi.',
                            showConfirmButton: true,
                        })
                    } else if (data.status === 200) {
                        console.log(data)
                        localStorage.setItem('token', data.data.user.token)
                        window.location.href = '/member-area/dashboard';
                    } else if (data.status === 404) {
                        swal({
                            type: 'error',
                            title: 'E-mail atau password yang kamu masukkan salah',
                            text: 'Silakan coba lagi.',
                            showConfirmButton: true,
                        })
                    }
                }).catch(err => {
                    swal({
                        type: 'error',
                        title: 'E-mail atau password yang kamu masukkan salah',
                        text: 'Silakan coba lagi.',
                        showConfirmButton: true,
                    })
                })
            }
        })
    }
}
