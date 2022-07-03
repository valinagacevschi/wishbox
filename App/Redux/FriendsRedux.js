import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  friendsRequest: null,
  friendsSuccess: ['payload'],
  friendsFailure: ['message'],
  sendInvite: ['email'],
  friendsOk: null,
  friendsNok: ['message'],
  friendsSearch: ['searchTerm'],
  friendsResults: ['results'],
  friendsAccept: ['id'],
  friendsRefuse: ['id'],
  friendsUnfriend: ['id'],
  friendsInvite: ['id'],
  friendsCancel: ['id', 'cat'],
  friendsResend: ['id'],
  reset: null
});

export const FriendsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  email: null,
  results: null,
  message: null
  // id: null,
  // searchTerm: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true, message: null });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
// export const failure = state => state.merge({ fetching: false, error: true });
export const failure = (state, { message }) =>
  state.merge({ fetching: false, error: true, message });

export const invite = (state, { email }) => state.merge({ fetching: true, email });

export const ok = state => state.merge({ fetching: false, error: null });

// export const search = (state) => state.merge({ fetching: true });

export const resulted = (state, { results }) =>
  state.merge({ fetching: false, error: null, results });

// export const set = (state) =>
//   state.merge({ fetching: true, message: null });

export const reset = state => INITIAL_STATE;
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FRIENDS_REQUEST]: request,
  [Types.FRIENDS_SUCCESS]: success,
  [Types.FRIENDS_FAILURE]: failure,
  [Types.SEND_INVITE]: invite,
  [Types.FRIENDS_OK]: ok,
  [Types.FRIENDS_NOK]: failure,
  [Types.FRIENDS_SEARCH]: request,
  [Types.FRIENDS_RESULTS]: resulted,
  [Types.FRIENDS_ACCEPT]: request,
  [Types.FRIENDS_REFUSE]: request,
  [Types.FRIENDS_INVITE]: request,
  [Types.FRIENDS_UNFRIEND]: request,
  [Types.FRIENDS_CANCEL]: request,
  [Types.FRIENDS_RESEND]: request,
  [Types.RESET]: reset
});
