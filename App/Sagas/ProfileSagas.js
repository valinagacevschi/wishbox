import { call, put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';
import ProfileActions from '../Redux/ProfileRedux';

export const selectUser = state => state.login.user;

export function* getProfile(api) {
  const user = yield select(selectUser);
  const response = yield call(api.getProfile, user.id);

  if (response.ok) {
    const complete = yield call(completed, response.data);
    yield [
      put(ProfileActions.profileCompleted(complete)),
      put(ProfileActions.profileSuccess(response.data))
    ];
  } else {
    yield put(ProfileActions.profileFailure());
  }
}

export function* saveProfile(api, { data }) {
  const user = yield select(selectUser);
  const response = yield call(api.saveProfile, data, user.id);
  if (response.ok) {
    yield put(ProfileActions.profileSuccess(response.data));
    const complete = yield call(completed, response.data);
    yield put(ProfileActions.profileCompleted(complete));
    if (complete) {
      Toast.showWithGravity(I18n.t('saveProfileSuccess'), Toast.LONG, Toast.CENTER);
    } else {
      Toast.showWithGravity(I18n.t('saveProfileIncomplete'), Toast.LONG, Toast.CENTER);
    }
  } else {
    yield put(ProfileActions.profileFailure());
    Toast.showWithGravity(I18n.t('saveProfileError'), Toast.LONG, Toast.CENTER);
  }
}

function completed(data) {
  const fields = ['uid', 'id', 'provider'];
  if (data.provider !== 'wb') {
    fields.push('password');
  }
  const profile = { ...data };
  fields.map(key => delete profile[key]);
  const complete = Object.values(profile).reduce((acc, val) => acc && !!val, true);
  return complete;
}
