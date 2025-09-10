import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const heroesAdapter = createEntityAdapter({
  selectId: (hero) => hero.id, 
  sortComparer: (a, b) => a.name.localeCompare(b.name), 
});

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetching(state) {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched(state, action) {
      heroesAdapter.setAll(state, action.payload); // заменяем весь список
      state.heroesLoadingStatus = 'idle';
    },
    heroesFetchingError(state) {
      state.heroesLoadingStatus = 'error';
    },
    heroDeleted(state, action) {
      heroesAdapter.removeOne(state, action.payload); // удаляем по id
    },
    heroAdded(state, action) {
      heroesAdapter.addOne(state, action.payload); // добавляем один элемент
    }
  }
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
  heroAdded
} = actions;

export const heroesSelectors = heroesAdapter.getSelectors((state) => state.heroes);