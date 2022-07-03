import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  webProductsRequest: ['query'],
  webProductsSuccess: ['payload'],
  webProductsFailure: null
});

export const WebProductsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => 
  state.merge({ fetching: true, data, payload: null });

// successful api lookup
export const success = (state, { payload }) => 
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state => 
  state.merge({ fetching: false, error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WEB_PRODUCTS_REQUEST]: request,
  [Types.WEB_PRODUCTS_SUCCESS]: success,
  [Types.WEB_PRODUCTS_FAILURE]: failure
});
