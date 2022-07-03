import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  membersSwitch: ['data'],
  membersRequest: ['data'],
  membersSuccess: ['payload'],
  membersFailure: null,
  reset: null
});

export const MembersTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MEMBERS_SWITCH]: request,
  [Types.MEMBERS_REQUEST]: request,
  [Types.MEMBERS_SUCCESS]: success,
  [Types.MEMBERS_FAILURE]: failure,
  [Types.RESET]: reset
});
