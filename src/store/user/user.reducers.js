import {
    REGISTER
} from './user.actionTypes';

const initialState = {
    id: 0,
    name: '',
    email: '',
    role: 0
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
            }
        default:
            return state;
    }
}

export default reducers;