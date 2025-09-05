// reducers/heroes.js
import { createReducer } from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleted,
    heroAdded
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
};

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
        })
        .addCase(heroAdded, (state, action) => {
            state.heroes.push(action.payload);
        });
});

export default heroes;