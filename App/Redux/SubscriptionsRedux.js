import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  subscriptionsRequest: null,
  subscriptionsSuccess: ['payload'],
  subscriptionsFailure: null,
  reset: null,
});

export const SubscriptionsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBSCRIPTIONS_REQUEST]: request,
  [Types.SUBSCRIPTIONS_SUCCESS]: success,
  [Types.SUBSCRIPTIONS_FAILURE]: failure,
  [Types.RESET]: reset
});
