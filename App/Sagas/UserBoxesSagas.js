import { call, put, select } from 'redux-saga/effects';
import UserBoxesActions from '../Redux/UserBoxesRedux';
import formatBoxes, { formatBox } from '../Transforms/UserBoxes';

export const selectUser = state => state.login.user;
export const selectOwner = state => state.userBoxes.selected;

export function* getUserBoxes(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.getUserBoxes, id, user.id);
  // success?
  if (response.ok) {
    const boxes = formatBoxes(response.data, user.id);
    yield put(UserBoxesActions.userBoxesSuccess(boxes));
    const owner = yield select(selectOwner);
    if (owner === null || id !== owner.id) {
      yield put(UserBoxesActions.userBoxesSelect(boxes[0]));
    }
  } else {
    __DEV__ && console.log('error getUserBoxes', response);
    yield put(UserBoxesActions.userBoxesFailure());
  }
}

export function* getUserBox(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.getBox, id, user.id);
  // success?
  if (response.ok) {
    const box = formatBox(response.data);
    yield put(UserBoxesActions.userBoxesSelect(box));
  } else {
    __DEV__ && console.log('error getBox', response);
    yield put(UserBoxesActions.userBoxesFailure());
  }
}
