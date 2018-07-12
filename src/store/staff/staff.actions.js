import {
    GET_STAFF_SUCCESS,
    GET_STAFF_ERROR,
    GET_STAFF_LOADING,
    CREATE_STAFF_SUCCESS,
} from './staff.actionTypes';
import axios from '../../axios';
import swal from 'sweetalert2';

export const getStaff = () => {
    return dispatch => {
        dispatch(getStaffLoading());
        axios.get(`/registration/staff?restaurantid=${localStorage.getItem('resid')}`)
            .then(data => {
                dispatch(getStaffSuccess(data.data.data));
            }).catch(err => {
                dispatch(getStaffError());
                console.log('action error')
            })
    }
}

const getStaffSuccess = (payload) => {
    return {
        type: GET_STAFF_SUCCESS,
        payload
    }
}

const getStaffLoading = () => {
    return {
        type: GET_STAFF_LOADING,
    }
}

const getStaffError = () => {
    return {
        type: GET_STAFF_ERROR,
    }
}

export const createStaff = (payload) => {
    return dispatch => {
        swal.showLoading()
        axios.post(`/registration/cashier?restaurantid=${localStorage.getItem('resid')}`, {
            name: payload.name,
            email: payload.email,
            password: payload.password
        })
            .then(data => {
                if (data.status === 201) {
                    swal({
                        type: 'success',
                        title: 'Berhasil',
                        text: 'Staff berhasil ditambahkan',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
                dispatch(createStaffSuccess(data.data.data));
            }).catch(err => {
                console.log('action error')
            })
    }
}

const createStaffSuccess = (payload) => {
    return {
        type: CREATE_STAFF_SUCCESS,
        payload
    }
}

export const deleteStaff = (payload) => {
    return dispatch => {
        axios.delete(`/registration/staff?id=${payload.id}`)
            .then(data => {
                dispatch(getStaff());
            })
            .catch(err => {
                console.log(err);
            })
    }
}