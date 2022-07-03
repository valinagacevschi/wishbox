import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedRequest: ['filter'],
  feedSuccess: ['payload'],
  countersRequest: null,
  countersSuccess: ['counters'],
  feedFailure: null,
  reset: null,
});

export const FeedTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  filter: null,
  fetching: null,
  payload: null,
  error: null,
  counters: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { filter }) =>
  state.merge({ fetching: true, filter });

// successful api lookup
export const success = (state, { payload }) => 
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

export const reset = state => INITIAL_STATE;

const countersSuccess = (state, { counters }) =>
  state.merge({ fetching: false, error: false, counters });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure,
  [Types.COUNTERS_REQUEST]: request,
  [Types.COUNTERS_SUCCESS]: countersSuccess,
  [Types.RESET]: reset,
});
