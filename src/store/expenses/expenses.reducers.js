import {
    GET_ITEM_SUCCESS,
    GET_ITEM_LOADING,
    GET_ITEM_ERROR,
    GET_UNIT_SUCCESS,
    CREATE_ITEM_SUCCESS
} from './expenses.actionTypes';

const initialState = {
    items: [],
    units: [],
    getItemLoading: false,
    getItemError: false,
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
        default:
            return state;
    }
}

export default reducers;