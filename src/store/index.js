import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import state from './state/state.reducers'
import user from './user/user.reducers'
import restaurant from './restaurant/restaurant.reducers';

const reducers = combineReducers ({
    state,
    user,
    restaurant
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;