import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import state from './state/state.reducers'
import user from './user/user.reducers'
import restaurant from './restaurant/restaurant.reducers';
import menu from './menu/menu.reducers';
import staff from './staff/staff.reducers';
import expenses from './expenses/expenses.reducers';
import sales from './sales/sales.reducers';

const reducers = combineReducers ({
    state,
    user,
    restaurant,
    menu,
    staff,
    expenses,
    sales
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;