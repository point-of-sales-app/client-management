import {
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_LOADING,
    GET_RESTAURANT_ERROR,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANT_BYID_SUCCESS,
    GET_RESTAURANT_BYID_LOADING,
    GET_RESTAURANT_BYID_ERROR
} from './restaurant.actionTypes'
import swal from 'sweetalert2';
import axios from '../../axios';

export const getRestaurant = () => {
    return dispatch => {
        dispatch(getRestaurantLoading());
        axios.get('/restaurant')
            .then(data => {
                dispatch(getRestaurantSuccess(data.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getRestaurantError());
            })
    }
}

const getRestaurantSuccess = (payload) => {
    return {
        type: GET_RESTAURANT_SUCCESS,
        payload
    }
}

const getRestaurantLoading = () => {
    return {
        type: GET_RESTAURANT_LOADING
    }
}

const getRestaurantError = () => {
    return {
        type: GET_RESTAURANT_ERROR
    }
}

export const createRestaurant = (payload) => {
    let { name, address, email, tax } = payload;
    if(tax === 1) {
        tax = 10;
    }
    return dispatch => {
        swal.showLoading()
        axios.post('/restaurant',{
            name,
            address,
            email,
            tax
        })
            .then(data => {
                if (data.status === 201) {
                    swal({
                        type: 'success',
                        title: 'Berhasil',
                        text: 'Restaurant berhasil ditambahkan',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
                dispatch(createRestaurantSuccess(data.data.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const createRestaurantSuccess = (payload) => {
    return {
        type: CREATE_RESTAURANT_SUCCESS,
        payload
    }
}

export const getRestaurantById = (payload) => {
    return dispatch => {
        dispatch(getRestaurantByIdLoading());
        axios.get(`/restaurant/find?id=${localStorage.getItem('resid')}`)
            .then(data => {
                dispatch(getRestaurantByIdSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getRestaurantByIdError());
            })
    }
}

const getRestaurantByIdSuccess = (payload) => {
    return {
        type: GET_RESTAURANT_BYID_SUCCESS,
        payload
    }
}

const getRestaurantByIdLoading = () => {
    return {
        type: GET_RESTAURANT_BYID_LOADING
    }
}

const getRestaurantByIdError = () => {
    return {
        type: GET_RESTAURANT_BYID_ERROR
    }
}