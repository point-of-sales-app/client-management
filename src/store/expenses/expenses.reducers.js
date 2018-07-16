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

const initialState = {
    items: [],
    units: [],
    expenses: [],
    sum: 0,
    getItemLoading: false,
    getItemError: false,
    getExpensesLoading: false,
    getExpensesError: false,
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEM_SUCCESS:
            return {
                ...state,
                items: action.payload,
                getItemLoading: false,
                getItemError: false
            }
        case GET_ITEM_LOADING:
            return {
                ...state,
                getItemError: false,
                getItemLoading: true,
            }
        case GET_ITEM_ERROR:
            return {
                ...state,
                getItemLoading: false,
                getItemError: true
            }
        case GET_UNIT_SUCCESS:
            return {
                ...state,
                units: action.payload
            }
        case CREATE_ITEM_SUCCESS:
            state.items.push(action.payload);
            return {
                ...state
            }
        case GET_EXPENSES_SUCCESS:
            return {
                ...state,
                sum: action.payload.sum,
                expenses: action.payload.data,
                getExpensesLoading: false,
                getExpensesError: false
            }
        case GET_EXPENSES_LOADING:
            return {
                ...state,
                getExpensesError: false,
                getExpensesLoading: true,
            }
        case GET_EXPENSES_ERROR:
            return {
                ...state,
                getExpensesLoading: false,
                getExpensesError: true
            }
        case CREATE_EXPENSES_SUCCESS:
            state.expenses.push(action.payload);
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducers;