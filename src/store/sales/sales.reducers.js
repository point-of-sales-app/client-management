import {
    GET_SUMMARY_ERROR,
    GET_SUMMARY_LOADING,
    GET_SUMMARY_SUCCESS,
    GET_DASHBOARD_SUCCESS,
    GET_DASHBOARD_LOADING,
    GET_DASHBOARD_ERROR
} from './sales.actionTypes';

const initialState = {
    data: [],
    summary: {},
    dashboard: '',
    getSummaryLoading: true,
    getSummaryError: false,
    getDashboardLoading: true,
    getDashboardError: false,
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
        case GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                dashboard: action.payload,
                getDashboardLoading: false,
                getDashboardError: false
            }
        case GET_DASHBOARD_LOADING:
            return {
                ...state,
                getDashboardError: false,
                getDashboardLoading: true,
            }
        case GET_DASHBOARD_ERROR:
            return {
                ...state,
                getDashboardLoading: false,
                getDashboardError: true
            }
        default:
            return state;
    }
}

export default reducers;