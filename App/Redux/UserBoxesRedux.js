import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userBoxesRequest: ['id'],
  userBoxesSuccess: ['payload'],
  userBoxesFailure: null,
  userBoxesSelect: ['selected'],
  reset: null,
  userBoxRequest: ['id'],
});

export const UserBoxesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  fetching: null,
  payload: null,
  error: null,
  selected: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { id }) => {
  const payload = id === state.id ? state.payload : null;
  return state.merge({ fetching: true, id, payload });
};

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true, payload: null });

export const select = (state, { selected }) => state.merge({ fetching: false, selected });

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_BOXES_REQUEST]: request,
  [Types.USER_BOXES_SUCCESS]: success,
  [Types.USER_BOXES_FAILURE]: failure,
  [Types.USER_BOXES_SELECT]: select,
  [Types.RESET]: reset,
  [Types.USER_BOX_REQUEST]: request,
});
