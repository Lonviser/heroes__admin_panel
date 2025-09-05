// actions.js

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    fetch("http://localhost:3001/heroes")
        .then(response => response.json())
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}
export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    };
};

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    };
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    };
};

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    };
};

export const heroAdded = (hero) => {
    return {
        type: 'HERO_ADDED',
        payload: hero
    };
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
 
// Асинхронный экшен для загрузки фильтров (теперь это thunk)
export const fetchFilters = () => (dispatch) => {
    // Имитируем запрос к серверу
    fetch("http://localhost:3001/filters")
        .then(response => response.json())
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => console.log('Ошибка загрузки фильтров'));
};