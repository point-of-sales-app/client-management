import {
    GET_ITEM_SUCCESS,
    GET_ITEM_LOADING,
    GET_ITEM_ERROR,
    GET_UNIT_SUCCESS,
    CREATE_ITEM_SUCCESS
} from './expenses.actionTypes';
import axios from '../../axios';

export const getItem = () => {
    return dispatch => {
        dispatch(getItemLoading());
        axios.get(`/item/find?restaurantid=${localStorage.getItem('resid')}`)
            .then(data => {
                dispatch(getItemSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(getItemError());
            })
    }
}


const getItemSuccess = (payload) => {
    return {
        type: GET_ITEM_SUCCESS,
        payload
    }
}

const getItemLoading = () => {
    return {
        type: GET_ITEM_LOADING
    }
}

const getItemError = () => {
    return {
        type: GET_ITEM_ERROR
    }
}

export const getUnit = () => {
    return dispatch => {
        axios.get(`/item/findUnit`)
            .then(data => {
                dispatch(getUnitSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const getUnitSuccess = (payload) => {
    return {
        type: GET_UNIT_SUCCESS,
        payload
    }
}

export const updateItem = (payload) => {
    return dispatch => {
        axios.put(`/item/update?id=${payload.id}`, {
            name: payload.name,
            brand: payload.brand,
            UnitId: payload.unitid
        })
            .then(data => {
                dispatch(getItem());
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteItem = (payload) => {
    return dispatch => {
        axios.delete(`/item/delete?id=${payload.id}`)
            .then(data => {
                dispatch(getItem());
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const createItem = (payload) => {
    return dispatch => {
        axios.post(`/item/create?restaurantid=${localStorage.getItem('resid')}`, {
            name: payload.name,
            brand: payload.brand,
            UnitId: payload.unitid
        })
            .then(data => {
                dispatch(createItemSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}


const createItemSuccess = (payload) => {
    return {
        type: CREATE_ITEM_SUCCESS,
        payload
    }
}