import { call, put } from 'redux-saga/effects';
import WebImagesActions from '../Redux/WebImagesRedux';

export function* getWebImages(api, action) {
  const { query } = action;
  // make the call to the api
  const response = yield call(api.getWebImages, query);
  // success?
  if (response.ok) {
    yield put(WebImagesActions.webImagesSuccess(response.data));
  } else {
    yield put(WebImagesActions.webImagesFailure());
  }
}

export function* saveWebImages(api, action) {
  const { link } = action;
  // make the call to the api
  const response = yield call(api.saveWebImages, link);
  // success?
  if (response.ok) {
    yield put(WebImagesActions.webImagesDone(response.data));
  } else {
    yield put(WebImagesActions.webImagesFailure());
  }
}
