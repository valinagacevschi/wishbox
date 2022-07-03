import { call, put, select } from 'redux-saga/effects';
import SubscriptionsActions from '../Redux/SubscriptionsRedux';
import formatBoxItems from '../Transforms/Feed';

export const selectUser = state => state.login.user;

export function* getSubscriptions(api) {
  const user = yield select(selectUser);
  const response = yield call(api.getSubscriptions, user.id);
  if (response.ok) {
    yield put(SubscriptionsActions.subscriptionsSuccess(formatBoxItems(response.data)));
  } else {
    yield put(SubscriptionsActions.subscriptionsFailure());
  }
}
