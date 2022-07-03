import { call, put } from 'redux-saga/effects';
import WebProductsActions from '../Redux/WebProductsRedux';
import formatProducts from '../Transforms/WebProduct';

export function* getWebProducts(api, action) {
  const { query } = action;
  const response = yield call(api.getWebProducts, query);
  // success?
  if (response.ok) {
    yield put(WebProductsActions.webProductsSuccess(formatProducts(response.data)));
  } else {
    yield put(WebProductsActions.webProductsFailure());
  }
}
