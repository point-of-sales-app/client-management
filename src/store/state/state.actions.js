import {
    UPDATE_PATHNAME
} from './state.actionTypes';

export const updatePathname = (payload) => {
    return {
        type: UPDATE_PATHNAME,
        payload
    }
}