import { call, put, select } from 'redux-saga/effects';
import MembersActions from '../Redux/MembersRedux';
import { formatMembers } from '../Transforms/User';

export const selectUser = state => state.login.user;

export function* getMembers(api, { data }) {
  const user = yield select(selectUser);
  const response = yield call(api.getMembers, data, user.id);
  // success?
  if (response.ok) {
    yield put(MembersActions.membersSuccess(formatMembers(response.data)));
  } else {
    __DEV__ && console.log('error getMembers', response);
    yield put(MembersActions.membersFailure());
  }
}

export function* switchMember(api, { data }) {
  const user = yield select(selectUser);
  const response = yield call(api.switchMember, data, user.id);

  if (response.ok) {
    yield put(MembersActions.membersSuccess(formatMembers(response.data)));
  } else {
    __DEV__ && console.log('error switchMember', response);
    yield put(MembersActions.membersFailure());
  }
}
