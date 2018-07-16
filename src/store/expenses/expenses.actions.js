import {
    GET_ITEM_SUCCESS,
    GET_ITEM_LOADING,
    GET_ITEM_ERROR,
    GET_UNIT_SUCCESS,
    CREATE_ITEM_SUCCESS,
    GET_EXPENSES_SUCCESS,
    GET_EXPENSES_LOADING,
    GET_EXPENSES_ERROR,
    CREATE_EXPENSES_SUCCESS
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

export const getExpenses = (payload) => {
    return dispatch => {
        dispatch(getExpensesLoading());
        axios.get(`expense/findDate?restaurantid=${localStorage.getItem('resid')}&from=${payload.dateFrom}&to=${payload.dateTo}`)
            .then(data => {
                dispatch(getExpensesSuccess(data.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(getExpensesError());
            })
    }
}

const getExpensesSuccess = (payload) => {
    return {
        type: GET_EXPENSES_SUCCESS,
        payload
    }
}

const getExpensesLoading = () => {
    return {
        type: GET_EXPENSES_LOADING
    }
}

const getExpensesError = () => {
    return {
        type: GET_EXPENSES_ERROR
    }
}

export const createExpenses = (payload) => {
    return dispatch => {
        axios.post(`/expense/create?restaurantid=${localStorage.getItem('resid')}`, {
            ItemId: payload.ItemId,
            qty: payload.qty,
            price: payload.price
        })
            .then(data => {
                dispatch(createExpensesSuccess(data.data.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const createExpensesSuccess = (payload) => {
    return {
        type: CREATE_EXPENSES_SUCCESS,
        payload
    }
}

export const deleteExpenses = (payload) => {
    return dispatch => {
        axios.delete(`/expense/delete?id=${payload.id}`)
            .then(data => {
                dispatch(getExpenses(payload));
            })
            .catch(err => {
                console.log(err);
            })
    }
}