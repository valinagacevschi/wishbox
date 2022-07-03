import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setToken: ['token', 'os'],
  deviceRegister: null,
  deviceSuccess: null,
  deviceFailure: null,
  reset: null,
});

export const DeviceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  token: null,
  os: null,
  error: null
});

/* ------------- Reducers ------------- */

const setToken = (state, { token, os }) => state.merge({ token, os });
// register the data from an api
export const register = (state) => state.merge({ fetching: true });
// successful api lookup
export const success = (state) => state.merge({ fetching: false, error: null });
// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true });

export const reset = state => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: setToken,
  [Types.DEVICE_REGISTER]: register,
  [Types.DEVICE_SUCCESS]: success,
  [Types.DEVICE_FAILURE]: failure,
  [Types.RESET]: reset,
});
