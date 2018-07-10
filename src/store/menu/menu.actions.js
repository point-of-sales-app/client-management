import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_LOADING,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_LOADING,
    SET_CATEGORY
} from './menu.actionTypes'
import axios from '../../axios';
import swal from 'sweetalert2';

export const getCategories = () => {
    return dispatch => {
        dispatch(getCategoriesLoading());
        axios.get(`/category/find?restaurantid=${localStorage.getItem('resid')}`)
            .then(data => {
                dispatch(getCategoriesSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getCategoriesError());
            })
    }
}

const getCategoriesSuccess = (payload) => {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload
    }
}

const getCategoriesLoading = () => {
    return {
        type: GET_CATEGORIES_LOADING
    }
}

const getCategoriesError = () => {
    return {
        type: GET_CATEGORIES_ERROR
    }
}

export const setCategory = (payload) => {
    return {
        type: SET_CATEGORY,
        payload
    }
}

export const createCategory = (payload) => {
    return dispatch => {
        dispatch(createCategoryLoading())
        swal({
            text: 'Silakan tunggu sebentar',
            onOpen: () => {
                swal.showLoading()
                axios.post(`/category/create?restaurantid=${localStorage.getItem('resid')}`,
                    {
                        name: payload.name
                    }).then(data => {
                        swal({
                            type: 'success',
                            title: 'Berhasil',
                            text: 'Category berhasil dibuat',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(success => {
                            dispatch(createCategorySuccess(data.data.data))
                        })
                    }).catch(err => {
                        console.log(err);
                        dispatch(createCategoryError());
                    })
            }
        })
    }
}

const createCategorySuccess = (payload) => {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        payload
    }
}

const createCategoryLoading = () => {
    return {
        type: CREATE_CATEGORY_LOADING
    }
}

const createCategoryError = () => {
    return {
        type: CREATE_CATEGORY_ERROR
    }
}