import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';



const store = createStore(
    combineReducers({heroes, filters}),
    applyMiddleware(thunk)
);

export default store;