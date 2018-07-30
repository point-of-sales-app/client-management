import {
    GET_SUMMARY_ERROR,
    GET_SUMMARY_LOADING,
    GET_SUMMARY_SUCCESS
} from './sales.actionTypes';

const initialState = {
    data: [],
    summary: {},
    getSummaryLoading: true,
    getSummaryError: false,
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUMMARY_SUCCESS:
            return {
                ...state,
                summary: action.payload.summary,
                data: action.payload.data,
                getSummaryLoading: false,
                getSummaryError: false
            }
        case GET_SUMMARY_LOADING:
            return {
                ...state,
                getSummaryError: false,
                getSummaryLoading: true,
            }
        case GET_SUMMARY_ERROR:
            return {
                ...state,
                getSummaryLoading: false,
                getSummaryError: true
            }
        default:
            return state;
    }
}

export default reducers;