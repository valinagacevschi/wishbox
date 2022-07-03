import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  boxItemRequest: ['id'],
  boxItemCommRequest: ['id'],
  boxItemAddCommRequest: ['id', 'comment', 'privated'],
  boxItemAddLikeRequest: ['id', 'added'],
  boxItemSubscribe: ['id', 'split'],
  boxItemUnsubscribe: ['id'],
  boxItemAccept: ['id'],
  boxItemReject: ['id'],
  boxItemReceived: ['id'],
  boxItemPurchased: ['id'],
  reset: null,

  boxItemSuccess: ['payload'],
  boxItemCommSuccess: ['comments'],
  boxItemFailure: null
});

export const BoxItemTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  fetching: null,
  payload: null,
  comments: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { id }) => {
  const payload = id === state.id ? state.payload : null;
  const comments = id === state.id ? state.comments : null;
  return state.merge({ fetching: true, id, comments, payload });
};

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

export const successComm = (state, { comments }) =>
  state.merge({ fetching: false, error: null, comments });

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true });

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOX_ITEM_REQUEST]: request,
  [Types.BOX_ITEM_COMM_REQUEST]: request,
  [Types.BOX_ITEM_ADD_COMM_REQUEST]: request,
  [Types.BOX_ITEM_ADD_LIKE_REQUEST]: request,
  [Types.BOX_ITEM_SUBSCRIBE]: request,
  [Types.BOX_ITEM_UNSUBSCRIBE]: request,
  [Types.BOX_ITEM_ACCEPT]: request,
  [Types.BOX_ITEM_REJECT]: request,
  [Types.BOX_ITEM_RECEIVED]: request,
  [Types.BOX_ITEM_PURCHASED]: request,
  [Types.RESET]: reset,

  [Types.BOX_ITEM_SUCCESS]: success,
  [Types.BOX_ITEM_COMM_SUCCESS]: successComm,

  [Types.BOX_ITEM_FAILURE]: failure
});
