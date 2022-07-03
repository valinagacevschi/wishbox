import { call, put, select, all } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';
import MyBoxesActions from '../Redux/MyBoxesRedux';
import FeedActions from '../Redux/FeedRedux';
import formatBoxes, { formatBox } from '../Transforms/UserBoxes';

export const selectUser = state => state.login.user;
export const selectedBox = state => state.myboxes.selected;

export function* getMyBoxes(api) {
  const user = yield select(selectUser);
  const selected = yield select(selectedBox);

  const response = yield call(api.getMyBoxes, user.id);
  // success?
  if (response.ok) {
    const boxes = formatBoxes(response.data, user.id);
    yield put(MyBoxesActions.myBoxesSuccess(boxes));
    if (selected) {
      const box = boxes.find(item => item.id === selected.id);
      yield put(MyBoxesActions.myBoxesSelect(box));
    }
  } else {
    __DEV__ && console.log('error getMyBoxes', response);
    yield put(MyBoxesActions.myBoxesFailure());
  }
}

export function* createBox(api, { name, date }) {
  const user = yield select(selectUser);
  const response = yield call(api.createBox, name, date, user.id);

  if (response.ok) {
    const boxes = formatBoxes(response.data, user.id);
    yield put(MyBoxesActions.myBoxesSuccess(boxes));
    if (boxes) {
      yield put(MyBoxesActions.myBoxesSelect(boxes.slice(-1)[0]));
    }
    Toast.showWithGravity(I18n.t('createBoxSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error createBox', response);
    yield put(MyBoxesActions.myBoxesFailure());
    Toast.showWithGravity(I18n.t('createBoxError'), Toast.LONG, Toast.CENTER);
  }
}

// export function* getMyBox(api, { id }) {
//   const user = yield select(selectUser);
//   const response = yield call(api.getBox, id, user.id);
//   // success?
//   if (response.ok) {
//     const box = formatBox(response.data);
//     yield put(MyBoxesActions.myBoxesSelect(box));    
//   } else {
//     __DEV__ && console.log('error getMyBox', response);
//     yield put(MyBoxesActions.myBoxesFailure());
//   }
// }

export function* deleteBox(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.deleteBox, id, user.id);

  if (response.ok) {
    const boxes = formatBoxes(response.data, user.id);
    yield [
      put(MyBoxesActions.myBoxesSuccess(boxes)),
      put(MyBoxesActions.myBoxesSelect(boxes[0])),
      put(FeedActions.feedRequest())
    ];
    Toast.showWithGravity(I18n.t('deleteBoxSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error deleteBox', response);
    yield put(MyBoxesActions.myBoxesFailure());
    Toast.showWithGravity(I18n.t('deleteBoxError'), Toast.LONG, Toast.CENTER);
  }
}

export function* setBoxDate(api, { id, date }) {
  const user = yield select(selectUser);
  const response = yield call(api.setBoxDate, id, date, user.id);

  if (response.ok) {
    const box = formatBox(response.data);
    yield put(MyBoxesActions.myBoxesSelect(box));
    Toast.showWithGravity(I18n.t('setBoxDateSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error setBoxDate', response);
    yield put(MyBoxesActions.myBoxesFailure());
    Toast.showWithGravity(I18n.t('setBoxDateError'), Toast.LONG, Toast.CENTER);
  }
}

export function* toggleBoxPrivate(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.toggleBoxPrivate, id, user.id);

  if (response.ok) {
    const box = formatBox(response.data);
    yield put(MyBoxesActions.myBoxesSelect(box));
  } else {
    __DEV__ && console.log('error toggleBoxPrivate', response);
    yield put(MyBoxesActions.myBoxesFailure());
  }
}

export function* addItem(api, { item }) {
  const user = yield select(selectUser);
  const selected = yield select(selectedBox);

  const boxId = item.boxId || selected.id;
  const response = yield call(api.addItem, boxId, item, user.id);

  if (response.ok) {
    const box = formatBox(response.data);
    yield [
      put(MyBoxesActions.myBoxesSelect(box)), 
      put(FeedActions.feedRequest())
    ];
    Toast.showWithGravity(I18n.t('addItemSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error addItem', response);
    yield put(MyBoxesActions.myBoxesFailure());
    Toast.showWithGravity(I18n.t('addItemError'), Toast.LONG, Toast.CENTER);
  }
}

export function* delItem(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.delItem, id, user.id);
  if (response.ok) {
    const boxes = formatBoxes(response.data, user.id);
    yield [
      put(MyBoxesActions.myBoxesSuccess(boxes)),
      put(FeedActions.feedRequest())
    ];
    Toast.showWithGravity(I18n.t('delItemSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error addItem', response);
    yield put(MyBoxesActions.myBoxesFailure());
    Toast.showWithGravity(I18n.t('delItemError'), Toast.LONG, Toast.CENTER);
  }
}
