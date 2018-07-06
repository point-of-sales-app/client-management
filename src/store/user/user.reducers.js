import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    REGISTER_LOADING,
} from './user.actionTypes';

const initialState = {
    registerLoading: false,
    registerError: false
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerLoading: false,
                registerError: false
            }
        case REGISTER_LOADING:
            return {
                ...state,
                registerError: false,
                registerLoading: true,
            }
        case REGISTER_ERROR:
            return {
                ...state,
                registerLoading: false,
                registerError: true
            }
        default:
            return state;
    }
}

export default reducers;