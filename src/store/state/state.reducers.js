import {
    UPDATE_PATHNAME
} from './state.actionTypes';

const initialState = {
    pathname: '',
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PATHNAME:
            return {
                pathname: action.payload
            }
        default:
            return state;
    }
}

export default reducers;