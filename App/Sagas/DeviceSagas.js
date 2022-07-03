import { call, put, select } from 'redux-saga/effects';
import DeviceInfo from 'react-native-device-info';
import DeviceActions from '../Redux/DeviceRedux';

export const selectDevice = (state) => state.device;
export const selectUser = (state) => state.login.user;

export function* deviceRegister(api) {
  const deviceId = DeviceInfo.getUniqueID();
  const user = yield select(selectUser);
  const { token, os } = yield select(selectDevice);
  __DEV__ && console.log('register', token, os);
  if (!token) return;
  const response = yield call(api.deviceRegister, deviceId, token, os, user.id);
  if (response.ok) {
    yield put(DeviceActions.deviceSuccess(response.data));
  } else {
    yield put(DeviceActions.deviceFailure());
  }
}
