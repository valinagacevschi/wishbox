import { call, put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';
import ProductsActions from '../Redux/ProductsRedux';
import FeedActions from '../Redux/FeedRedux';

export const selectUser = state => state.login.user;

export function* searchProducts(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.searchProducts, id, user.id);
  // success?
  if (response.ok) {
    yield put(ProductsActions.productsSearchSuccess(response.data));
  } else {
    __DEV__ && console.log('error searchProducts', response);
    yield put(ProductsActions.productsFailure());
  }
}

export function* getProducts(api) {
  const user = yield select(selectUser);
  const response = yield call(api.getProducts, user.id);
  // success?
  if (response.ok) {
    yield put(ProductsActions.productsSuccess(response.data));
  } else {
    __DEV__ && console.log('error getProducts', response);
    yield put(ProductsActions.productsFailure());
  }
}

export function* suggestProduct(api, { data }) {
  const user = yield select(selectUser);
  const response = yield call(api.suggestProduct, data, user.id);
  if (response.ok) {
    yield put(ProductsActions.productOk(response.data));
    Toast.showWithGravity(I18n.t('suggestSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error suggestProduct', response);
    yield put(ProductsActions.productNok());
    Toast.showWithGravity(I18n.t('suggestError'), Toast.LONG, Toast.CENTER);
  }
}

export function* addProduct(api, { data }) {
  const user = yield select(selectUser);
  const response = yield call(api.addProduct, data, user.id);

  if (response.ok) {
    yield [
      put(ProductsActions.productOk(response.data)),
      put(FeedActions.feedRequest())
    ];
    Toast.showWithGravity(I18n.t('addProductSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error addProduct', response);
    yield put(ProductsActions.productNok());
    Toast.showWithGravity(I18n.t('addProductError'), Toast.LONG, Toast.CENTER);
  }
}

export function* removeProduct(api, { data }) {
  const user = yield select(selectUser);
  const response = yield call(api.removeProduct, data, user.id);

  if (response.ok) {
    yield put(ProductsActions.productOk(response.data));
    Toast.showWithGravity(I18n.t('removeProductSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error removeProduct', response);
    yield put(ProductsActions.productNok());
    Toast.showWithGravity(I18n.t('removeProductError'), Toast.LONG, Toast.CENTER);
  }
}
