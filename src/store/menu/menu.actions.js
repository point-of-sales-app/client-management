import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_LOADING,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_LOADING,
    SET_CATEGORY,
    GET_MENU_SUCCESS,
    GET_MENU_LOADING,
    GET_MENU_ERROR,
    CREATE_MENU_SUCCESS,
    // UPDATE_MENU_SUCCESS,
    // DELETE_MENU_SUCCESS
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

export const getMenu = (payload) => {
    return dispatch => {
        dispatch(getMenuLoading());
        if(payload.categoryId === 0){
            axios.get(`/menu/find?restaurantid=${localStorage.getItem('resid')}`)
            .then(data => {
                dispatch(getMenuSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getMenuError());
            })
        } else {
            axios.get(`/menu/find?restaurantid=${localStorage.getItem('resid')}&categoryid=${payload.categoryId}`)
            .then(data => {
                dispatch(getMenuSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getMenuError());
            })
        }
        
    }
}

const getMenuSuccess = (payload) => {
    return {
        type: GET_MENU_SUCCESS,
        payload
    }
}

const getMenuLoading = () => {
    return {
        type: GET_MENU_LOADING
    }
}

const getMenuError = () => {
    return {
        type: GET_MENU_ERROR
    }
}

export const createMenu = (payload) => {
    return dispatch => {
        swal.showLoading()
        axios.post(`/menu/create?restaurantid=${localStorage.getItem('resid')}&categoryid=${payload.categoryId}`,{
            name: payload.name,
            price: payload.price
        })
            .then(data => {
                if (data.status === 201) {
                    swal({
                        type: 'success',
                        title: 'Berhasil',
                        text: 'Menu baru berhasil ditambahkan',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
                dispatch(createMenuSuccess(data.data.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const createMenuSuccess = (payload) => {
    return {
        type: CREATE_MENU_SUCCESS,
        payload
    }
}

export const updateMenu = (payload) => {
    return dispatch => {
        axios.put(`/menu/update?id=${payload.id}`, {
            name: payload.name,
            price: payload.price
        })
            .then(data => {
                dispatch(getMenu({categoryId: payload.categoryId}));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteMenu = (payload) => {
    return dispatch => {
        axios.delete(`/menu/delete?id=${payload.id}`)
            .then(data => {
                dispatch(getMenu({categoryId: payload.categoryId}));
            })
            .catch(err => {
                console.log(err);
            })
    }
}