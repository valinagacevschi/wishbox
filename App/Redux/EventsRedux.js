import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventsRequest: null,
  eventsSuccess: ['payload'],
  eventsFailure: null,
  reset: null,
});

export const EventsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
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
  [Types.EVENTS_REQUEST]: request,
  [Types.EVENTS_SUCCESS]: success,
  [Types.EVENTS_FAILURE]: failure,
  [Types.RESET]: reset,
});
