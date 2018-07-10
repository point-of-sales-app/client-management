import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_ERROR,
    SET_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_LOADING
} from './menu.actionTypes';

const initialState = {
    categories: [],
    selectedCategoryId: 0,
    getRestaurantLoading: false,
    getRestaurantError: false,
    createCategoryLoading: false,
    createCategoryError: false
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                getRestaurantLoading: false,
                getRestaurantError: false
            }
        case GET_CATEGORIES_LOADING:
            return {
                ...state,
                getRestaurantError: false,
                getRestaurantLoading: true,
            }
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                getRestaurantLoading: false,
                getRestaurantError: true
            }
        case SET_CATEGORY:
            return {
                ...state,
                selectedCategoryId: action.payload
            }
        case CREATE_CATEGORY_SUCCESS:
            state.categories.push(action.payload);
            return {
                ...state,
                createCategoryLoading: false,
                createCategoryError: false
            }
        case CREATE_CATEGORY_LOADING:
            return {
                ...state,
                createCategoryError: false,
                createCategoryLoading: true,
            }
        case CREATE_CATEGORY_ERROR:
            return {
                ...state,
                createCategoryLoading: false,
                createCategoryError: true
            }
        default:
            return state;
    }
}

export default reducers;