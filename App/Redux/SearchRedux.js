import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { filter } from 'ramda';
import { startsWith } from 'ramdasauce';

// const LIST_DATA = ['sausage', 'blubber'];

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  search: ['searchTerm'],
  cancelSearch: null
});

export const SearchTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  searchTerm: '',
  searching: false,
  results: [],
});

/* ------------- Reducers ------------- */

export const performSearch = (state, { searchTerm }) => {
  const results = filter(startsWith(searchTerm), []);
  return state.merge({ searching: true, searchTerm, results });
};

export const cancelSearch = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH]: performSearch,
  [Types.CANCEL_SEARCH]: cancelSearch
});
