import {
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_LOADING,
    GET_RESTAURANT_ERROR,
    CREATE_RESTAURANT_SUCCESS
} from './restaurant.actionTypes';

const initialState = {
    restaurants: [],
    getRestaurantLoading: false,
    getRestaurantError: false
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESTAURANT_SUCCESS:
            return {
                ...state,
                restaurants: action.payload.data,
                getRestaurantLoading: false,
                getRestaurantError: false
            }
        case GET_RESTAURANT_LOADING:
            return {
                ...state,
                getRestaurantError: false,
                getRestaurantLoading: true,
            }
        case GET_RESTAURANT_ERROR:
            return {
                ...state,
                getRestaurantLoading: false,
                getRestaurantError: true
            }
        case CREATE_RESTAURANT_SUCCESS:
            state.restaurants.push(action.payload);
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducers;