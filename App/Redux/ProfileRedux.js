import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profileRequest: null,
  profileSuccess: ['payload'],
  profileFailure: null,
  profileSave: ['data'],
  profileCompleted: ['complete'],
  reset: null,
  toggleTutorial: ['tutorialOn'],
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  complete: false,
  tutorialOn: true,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });


// Something went wrong somewhere.
export const failure = (state) =>
  state.merge({ fetching: false, error: true });

export const completed = (state, { complete }) =>
  state.merge({ fetching: false, error: null, complete });

export const reset = (state) => INITIAL_STATE;

export const tutorial = (state, { tutorialOn }) =>
  state.merge({ tutorialOn });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.PROFILE_SAVE]: request,
  [Types.PROFILE_COMPLETED]: completed,
  [Types.RESET]: reset,
  [Types.TOGGLE_TUTORIAL]: tutorial,
});
