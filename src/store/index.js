import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import { configureStore } from '@reduxjs/toolkit';



// const store = createStore(
//     combineReducers({heroes, filters}),
//     applyMiddleware(thunk)
// );

const store = configureStore({
    reducer: {heroes, filters},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})

export default store;