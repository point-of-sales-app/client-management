import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_ERROR,
    SET_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_LOADING,
    GET_MENU_SUCCESS,
    GET_MENU_LOADING,
    GET_MENU_ERROR,
    CREATE_MENU_SUCCESS
} from './menu.actionTypes';

const initialState = {
    categories: [],
    selectedCategoryId: 0,
    menu: [],
    getRestaurantLoading: false,
    getRestaurantError: false,
    createCategoryLoading: false,
    createCategoryError: false,
    getMenuLoading: false,
    getMenuError: false
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
        case GET_MENU_SUCCESS:
            return {
                ...state,
                menu: action.payload,
                getMenuLoading: false,
                getMenuError: false
            }
        case GET_MENU_LOADING:
            return {
                ...state,
                getMenuError: false,
                getMenuLoading: true,
            }
        case GET_MENU_ERROR:
            return {
                ...state,
                getMenuLoading: false,
                getMenuError: true
            }
        case CREATE_MENU_SUCCESS:
            state.menu.push(action.payload);
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducers;