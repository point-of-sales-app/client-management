import {
    GET_SUMMARY_ERROR,
    GET_SUMMARY_LOADING,
    GET_SUMMARY_SUCCESS,
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
