import { put, select } from 'redux-saga/effects';
import FeedActions from '../Redux/FeedRedux';
import ProductsActions from '../Redux/ProductsRedux';
// import ProfileActions from '../Redux/ProfileRedux';
import DeviceActions from '../Redux/DeviceRedux';

export const selectUser = (state) => state.login.user;

export function* startup() {
  const user = yield select(selectUser);
  if (user) {
    yield [
      // put(ProfileActions.profileRequest()),
      put(DeviceActions.deviceRegister()),
      put(ProductsActions.productsRequest()),
      put(FeedActions.feedRequest()),
    ];
  }
}
