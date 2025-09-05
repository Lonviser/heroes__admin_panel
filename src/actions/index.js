// actions/index.js
import { createAction } from "@reduxjs/toolkit";

export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
export const heroDeleted = createAction('HERO_DELETED');
export const heroAdded = createAction('HERO_ADDED');

// Асинхронный экшен для загрузки героев
export const fetchHeroes = () => (dispatch) => {
    dispatch(heroesFetching());
    fetch("http://localhost:3001/heroes")
        .then(response => response.json())
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

// Синхронный экшен для получения фильтров
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    };
};

// Синхронный экшен для установки активного фильтра
export const setActiveFilter = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    };
};

// Асинхронный экшен для загрузки фильтров
export const fetchFilters = () => (dispatch) => {
    fetch("http://localhost:3001/filters")
        .then(response => response.json())
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => console.log('Ошибка загрузки фильтров'));
};