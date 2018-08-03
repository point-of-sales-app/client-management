import {
    GET_SUMMARY_ERROR,
    GET_SUMMARY_LOADING,
    GET_SUMMARY_SUCCESS,
    GET_DASHBOARD_SUCCESS,
    GET_DASHBOARD_LOADING,
    // GET_DASHBOARD_ERROR
} from './sales.actionTypes';
import axios from '../../axios';

export const getSummary = (payload) => {
    return dispatch => {
        dispatch(getSummaryLoading());
        axios.get(`sales/summary?restaurantid=${localStorage.getItem('resid')}&from=${payload.dateFrom}&to=${payload.dateTo}`)
            .then(data => {
                dispatch(getSummarySuccess(data.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(getSummaryError());
            })
    }
}

const getSummarySuccess = (payload) => {
    return {
        type: GET_SUMMARY_SUCCESS,
        payload
    }
}

const getSummaryLoading = () => {
    return {
        type: GET_SUMMARY_LOADING
    }
}

const getSummaryError = () => {
    return {
        type: GET_SUMMARY_ERROR
    }
}

export const getDasboard = (payload) => {
    return async dispatch => {
        dispatch(getDashboardLoading());
        const totalTransaction = await axios.get(`dashboard/totalTransaction?restaurantid=${localStorage.getItem('resid')}&from=${payload.dateFrom}&to=${payload.dateTo}`);
        const profit = await axios.get(`dashboard/profit?restaurantid=${localStorage.getItem('resid')}&from=${payload.dateFrom}&to=${payload.dateTo}`);
        const graph = await axios.get(`dashboard/graph?restaurantid=${localStorage.getItem('resid')}&from=${payload.dateFrom}&to=${payload.dateTo}`);
        dispatch(getDashboardSuccess({
            totalTransaction: totalTransaction.data.data,
            profit: profit.data,
            graph
        }));
    }
}

const getDashboardSuccess = (payload) => {
    return {
        type: GET_DASHBOARD_SUCCESS,
        payload
    }
}

const getDashboardLoading = () => {
    return {
        type: GET_DASHBOARD_LOADING
    }
}

// const getDashboardError = () => {
//     return {
//         type: GET_DASHBOARD_ERROR
//     }
// }
