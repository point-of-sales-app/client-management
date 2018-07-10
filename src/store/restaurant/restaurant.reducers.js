import {
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_LOADING,
    GET_RESTAURANT_ERROR,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANT_BYID_SUCCESS,
    GET_RESTAURANT_BYID_LOADING,
    GET_RESTAURANT_BYID_ERROR
} from './restaurant.actionTypes';

const initialState = {
    restaurants: [],
    restaurant: {},
    getRestaurantLoading: false,
    getRestaurantError: false,
    getRestaurantByIdLoading: false,
    getRestaurantByIdError: false,
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
        case GET_RESTAURANT_BYID_SUCCESS:
            return {
                ...state,
                restaurant: action.payload,
                getRestaurantByIdLoading: false,
                getRestaurantByIdError: false
            }
        case GET_RESTAURANT_BYID_LOADING:
            return {
                ...state,
                getRestaurantByIdError: false,
                getRestaurantByIdLoading: true,
            }
        case GET_RESTAURANT_BYID_ERROR:
            return {
                ...state,
                getRestaurantByIdLoading: false,
                getRestaurantByIdError: true
            }
        default:
            return state;
    }
}

export default reducers;