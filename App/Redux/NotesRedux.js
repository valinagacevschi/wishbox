import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notesRequest: null,
  notesMarkAll: null,
  notesMark: ['id'],
  notesDelete: ['id'],
  notesSuccess: ['payload'],
  notesFailure: null,
  reset: null
});

export const NotesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the id from an api
export const request = (state) =>
  state.merge({ fetching: true });

// successful api lookup
export const success = (state, { payload }) => 
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

// export const erase = (state, { id }) =>
//   state.merge({ fetching: true, id, payload: null });

const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTES_REQUEST]: request,
  [Types.NOTES_DELETE]: request,
  [Types.NOTES_MARK]: request,
  [Types.NOTES_MARK_ALL]: request,
  [Types.NOTES_SUCCESS]: success,
  [Types.NOTES_FAILURE]: failure,
  [Types.RESET]: reset,
});
