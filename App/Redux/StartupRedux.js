import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
});

export const StartupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({ rehidrated: false });

/* ------------- Reducers ------------- */

//export
const startup = state => state.merge({ rehidrated: true });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
});
