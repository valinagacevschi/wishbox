import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  webImagesRequest: ['query'],
  webImagesSuccess: ['payload'],
  webImagesFailure: null,
  webImagesSave: ['link'],
  webImagesDone: ['image'],
});

export const WebImagesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  image: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const saved = (state, { image }) =>
  state.merge({ fetching: false, error: null, image });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WEB_IMAGES_REQUEST]: request,
  [Types.WEB_IMAGES_SUCCESS]: success,
  [Types.WEB_IMAGES_FAILURE]: failure,
  [Types.WEB_IMAGES_SAVE]: request,
  [Types.WEB_IMAGES_DONE]: saved,
});
