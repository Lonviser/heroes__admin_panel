// actions/index.js
import { heroesFetching, heroesFetched,heroesFetchingError } from "../components/heroesList/heroesSlice";



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