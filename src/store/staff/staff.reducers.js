import {
    GET_STAFF_SUCCESS,
    GET_STAFF_LOADING,
    GET_STAFF_ERROR,
    CREATE_STAFF_SUCCESS
} from './staff.actionTypes';

const initialState = {
    staff: [],
    getStaffLoading: false,
    getStaffError: false
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_STAFF_SUCCESS:
            return {
                ...state,
                staff: action.payload,
                getStaffLoading: false,
                getStaffError: false
            }
        case GET_STAFF_LOADING:
            return {
                ...state,
                getStaffError: false,
                getStaffLoading: true,
            }
        case GET_STAFF_ERROR:
            return {
                ...state,
                getStaffLoading: false,
                getStaffError: true
            }
        case CREATE_STAFF_SUCCESS:
            state.staff.push(action.payload)
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducers;