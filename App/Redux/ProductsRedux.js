import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productsRequest: null,
  productsSuccess: ['results'],
  productsFailure: null,
  productsSearch: ['id'],
  productsSearchSuccess: ['payload'],
  productSuggest: ['data'],
  productAdd: ['data'],
  productRemove: ['data'],
  productOk: null,
  productNok: null,
  reset: null,
});

export const ProductsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  fetching: null,
  payload: null,
  results: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the id from an api
export const request = (state) =>
  state.merge({ fetching: true });

// successful api lookup
export const success = (state, { results }) =>
  state.merge({ fetching: false, error: null, results });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

export const search = (state, { id }) =>
  state.merge({ fetching: true, id, payload: null });

// successful api lookup
export const searchSuccess = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

export const suggest = (state) => state.merge({ fetching: true, error: null });

export const ok = (state) => state.merge({ fetching: false });
export const nok = (state) => state.merge({ fetching: false, error: true });

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCTS_REQUEST]: request,
  [Types.PRODUCTS_SUCCESS]: success,
  [Types.PRODUCTS_FAILURE]: failure,
  [Types.PRODUCTS_SEARCH]: search,
  [Types.PRODUCTS_SEARCH_SUCCESS]: searchSuccess,
  [Types.PRODUCT_SUGGEST]: suggest,
  [Types.PRODUCT_ADD]: suggest,
  [Types.PRODUCT_REMOVE]: suggest,
  [Types.PRODUCT_OK]: ok,
  [Types.PRODUCT_NOK]: nok,
  [Types.RESET]: reset,
});
