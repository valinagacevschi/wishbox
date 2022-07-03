import { call, put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';
// import camelcaseKeys from 'camelcase-keys';
import BoxItemActions from '../Redux/BoxItemRedux';
import MyBoxesActions from '../Redux/MyBoxesRedux';
import FeedActions from '../Redux/FeedRedux';
import SubscriptionsActions from '../Redux/SubscriptionsRedux';
import { formatBoxItem } from '../Transforms/Feed';

export const selectUser = state => state.login.user;

export function* getBoxItem(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.getBoxItem, id, user.id);
  if (response.ok) {
    const { item, comments } = response.data;
    const boxItem = formatBoxItem(item);
    yield [
      put(BoxItemActions.boxItemSuccess(boxItem)),
      put(BoxItemActions.boxItemCommSuccess(comments))
    ];
  } else {
    Toast.showWithGravity(I18n.t('item_not_found'), Toast.LONG, Toast.CENTER);
    console.log('error getBoxItem', response);
    yield put(BoxItemActions.boxItemFailure());
  }
}

export function* getComments(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.getComments, id, user.id);

  if (response.ok) {
    yield put(BoxItemActions.boxItemCommSuccess(response.data));
  } else {
    console.log('error getComments', response);
    yield put(BoxItemActions.boxItemFailure());
  }
}

export function* addComment(api, { id, comment, privated }) {
  const user = yield select(selectUser);
  const response = yield call(api.addComment, id, comment, privated, user.id);
  console.log('private', privated);
  if (response.ok) {
    yield [put(BoxItemActions.boxItemCommSuccess(response.data)), put(FeedActions.feedRequest())];
  } else {
    console.log('error addComment', response);
    yield put(BoxItemActions.boxItemFailure());
  }
}

export function* addLike(api, { id, added }) {
  const user = yield select(selectUser);
  const response = yield call(api.addLike, id, added, user.id);

  if (response.ok) {
    yield [put(BoxItemActions.boxItemCommSuccess(response.data)), put(FeedActions.feedRequest())];
  } else {
    console.log('error addLike', response);
    yield put(BoxItemActions.boxItemFailure());
  }
}

export function* subscribe(api, { id, split }) {
  const user = yield select(selectUser);
  const response = yield call(api.subscribe, id, split, user.id);

  if (response.ok) {
    const boxItem = formatBoxItem(response.data);
    yield [
      put(BoxItemActions.boxItemSuccess(boxItem)),
      put(FeedActions.feedRequest()),
      put(SubscriptionsActions.subscriptionsRequest())
    ];
    Toast.showWithGravity(I18n.t('subscribeSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    console.log('error subscribe', response);
    yield put(BoxItemActions.boxItemFailure());
    Toast.showWithGravity(I18n.t('subscribeError'), Toast.LONG, Toast.CENTER);
  }
}

export function* unsubscribe(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.unsubscribe, id, user.id);

  if (response.ok) {
    const boxItem = formatBoxItem(response.data);
    yield [
      put(BoxItemActions.boxItemSuccess(boxItem)),
      put(FeedActions.feedRequest()),
      put(SubscriptionsActions.subscriptionsRequest())
    ];
    Toast.showWithGravity(I18n.t('unsubscribeSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    console.log('error unsubscribe', response);
    yield put(BoxItemActions.boxItemFailure());
    Toast.showWithGravity(I18n.t('unsubscribeError'), Toast.LONG, Toast.CENTER);
  }
}

export function* acceptItem(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.updateBoxItem, id, 'accept', user.id);

  if (response.ok) {
    const boxItem = formatBoxItem(response.data);
    yield put(BoxItemActions.boxItemSuccess(boxItem));
    yield [put(MyBoxesActions.myBoxesRequest()), put(FeedActions.feedRequest())];
    Toast.showWithGravity(I18n.t('acceptItemSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    console.log('error acceptItem', response);
    yield put(BoxItemActions.boxItemFailure());
    Toast.showWithGravity(I18n.t('acceptItemError'), Toast.LONG, Toast.CENTER);
  }
}

export function* reject(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.updateBoxItem, id, 'reject', user.id);

  if (response.ok) {
    const boxItem = formatBoxItem(response.data);
    yield put(BoxItemActions.boxItemSuccess(boxItem));
    yield [put(MyBoxesActions.myBoxesRequest()), put(FeedActions.feedRequest())];
    Toast.showWithGravity(I18n.t('rejectSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    console.log('error reject', response);
    yield put(BoxItemActions.boxItemFailure());
    Toast.showWithGravity(I18n.t('rejectError'), Toast.LONG, Toast.CENTER);
  }
}

export function* received(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.updateBoxItem, id, 'received', user.id);

  if (response.ok) {
    const boxItem = formatBoxItem(response.data);
    yield [
      put(BoxItemActions.boxItemSuccess(boxItem)),
      put(MyBoxesActions.myBoxesRequest()),
      put(FeedActions.feedRequest())
    ];
    Toast.showWithGravity(I18n.t('receivedSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    console.log('error received', response);
    yield put(BoxItemActions.boxItemFailure());
    Toast.showWithGravity(I18n.t('receivedError'), Toast.LONG, Toast.CENTER);
  }
}

export function* purchased(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.updateBoxItem, id, 'purchased', user.id);

  if (response.ok) {
    const boxItem = formatBoxItem(response.data);
    yield [
      put(BoxItemActions.boxItemSuccess(boxItem)),
      put(SubscriptionsActions.subscriptionsRequest()),
      put(MyBoxesActions.myBoxesRequest()),
      put(FeedActions.feedRequest())
    ];
    Toast.showWithGravity(I18n.t('purchasedSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    console.log('error purchased', response);
    yield put(BoxItemActions.boxItemFailure());
    Toast.showWithGravity(I18n.t('purchasedError'), Toast.LONG, Toast.CENTER);
  }
}
