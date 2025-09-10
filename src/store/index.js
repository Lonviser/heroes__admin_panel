import { thunk } from 'redux-thunk';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
    reducer: {heroes, filters,[apiSlice.reducerPath]: apiSlice.reducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk, apiSlice.middleware)
})

export default store;