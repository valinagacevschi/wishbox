import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myBoxesRequest: null,
  myBoxesSuccess: ['payload'],
  myBoxesFailure: null,
  // myBoxRequest: ['id'],
  myBoxesSelect: ['selected'],
  myBoxesCreate: ['name', 'date'],
  myBoxesDelete: ['id'],
  myBoxesSetDate: ['id', 'date'],
  myBoxesToggle: ['id'],
  myBoxesAddItem: ['item'],
  myBoxesDelItem: ['id'],
  reset: null
});

export const MyBoxesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  selected: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => state.merge({ fetching: true });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true });

export const select = (state, { selected }) => state.merge({ fetching: false, selected });

export const reset = () => INITIAL_STATE;

export const toggle = (state, { id }) => {
  const payload = state.payload.asMutable({ deep: true });
  const index = payload.findIndex(el => el.id === id);
  payload[index].private = !payload[index].private;
  return state.merge({ fetching: true, payload });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_BOXES_REQUEST]: request,
  [Types.MY_BOXES_SUCCESS]: success,
  [Types.MY_BOXES_FAILURE]: failure,
  [Types.MY_BOXES_SELECT]: select,
  // [Types.MY_BOX_REQUEST]: request,
  [Types.MY_BOXES_CREATE]: request,
  [Types.MY_BOXES_DELETE]: request,
  [Types.MY_BOXES_SET_DATE]: request,
  [Types.MY_BOXES_TOGGLE]: toggle,
  [Types.MY_BOXES_ADD_ITEM]: request,
  [Types.MY_BOXES_DEL_ITEM]: request,
  [Types.RESET]: reset
});
