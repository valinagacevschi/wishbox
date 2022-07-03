import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['username', 'password'],
  recoverRequest: ['username'],
  loginOk: ['message'],
  loginRequest: ['username', 'password'],
  loginSuccess: ['user', 'access_token'],
  loginFailure: ['error'],

  oauthRequest: ['authType'],
  oauthSuccess: ['user', 'access_token'],
  oauthFailure: ['error'],
  sendRequest: ['person'],
  logout: null,
  firstTime: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  pushToken: null,
  access_token: null,
  error: null,
  fetching: false,
  firstTime: true,
});

/* ------------- Reducers ------------- */

export const ok = (state, { message }) => 
  state.merge({ fetching: false, error: null });

// we're attempting to login
export const request = (state) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state, { user, access_token }) =>
  state.merge({ fetching: false, error: null, user, access_token });

// we've had a problem logging in
export const failure = (state, { error }) => {
  Toast.showWithGravity(I18n.t(error), Toast.LONG, Toast.CENTER);
  return state.merge({ fetching: false, error });
};

// we've logged out
const logout = (state) => INITIAL_STATE.merge({ firstTime: false });

const firstTime = (state) => state.merge({ firstTime: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.RECOVER_REQUEST]: request,
  [Types.LOGIN_OK]: ok,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.OAUTH_REQUEST]: request,
  [Types.OAUTH_SUCCESS]: success,
  [Types.OAUTH_FAILURE]: failure,
  [Types.SEND_REQUEST]: request,
  [Types.LOGOUT]: logout,
  [Types.FIRST_TIME]: firstTime,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.user !== null;
