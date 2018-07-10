import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import state from './state/state.reducers'
import user from './user/user.reducers'
import restaurant from './restaurant/restaurant.reducers';
import menu from './menu/menu.reducers';

const reducers = combineReducers ({
    state,
    user,
    restaurant,
    menu
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;