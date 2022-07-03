import { put, call } from 'redux-saga/effects';
import { facebook } from 'react-native-simple-auth';
// import StartupActions from '../Redux/StartupRedux';
import LoginActions from '../Redux/LoginRedux';
import DeviceActions from '../Redux/DeviceRedux';
import FeedActions from '../Redux/FeedRedux';
import ProductsActions from '../Redux/ProductsRedux';
import FriendsActions from '../Redux/FriendsRedux';
import ProfileActions from '../Redux/ProfileRedux';
import MyBoxesActions from '../Redux/MyBoxesRedux';

import BoxItemActions from '../Redux/BoxItemRedux';
import EventsActions from '../Redux/EventsRedux';
import MembersActions from '../Redux/MembersRedux';
import NotesActions from '../Redux/NotesRedux';
import SubscriptionsActions from '../Redux/SubscriptionsRedux';
import UserBoxesActions from '../Redux/UserBoxesRedux';

import { authUser } from '../Transforms/User';

export function* register(api, { username, password }) {
  const response = yield call(api.registerUser, username, password);
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data, response.data.access_token));
    yield [
      put(FeedActions.feedRequest()),
      put(ProductsActions.productsRequest()),
      put(FriendsActions.friendsRequest()),
      put(MyBoxesActions.myBoxesRequest()),
      put(ProfileActions.profileRequest()),
      put(DeviceActions.deviceRegister()),
    ];
  } else {
    __DEV__ && console.log('error register', response.data.error);
    yield put(LoginActions.loginFailure(response.data.error));
  }
}
// attempts to login
export function* login(api, { username, password }) {
  const response = yield call(api.loginUser, username, password);
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data, response.data.access_token));
    yield [
      put(FeedActions.feedRequest()),
      put(ProductsActions.productsRequest()),
      put(FriendsActions.friendsRequest()),
      put(MyBoxesActions.myBoxesRequest()),
      put(ProfileActions.profileRequest()),
      put(DeviceActions.deviceRegister()),
    ];
  } else {
    __DEV__ && console.log('error login', response.data.error);
    yield put(LoginActions.loginFailure(response.data.error));
  }
}

export function* logout() {
  yield [
    put(FeedActions.reset()),
    put(BoxItemActions.reset()),
    put(ProductsActions.reset()),
    put(FriendsActions.reset()),
    put(ProfileActions.reset()),
    put(MyBoxesActions.reset()),
    put(EventsActions.reset()),
    put(MembersActions.reset()),
    put(NotesActions.reset()),
    put(SubscriptionsActions.reset()),
    put(UserBoxesActions.reset())
  ];
}

export function* oAuth({ authType }) {
  const response = yield call(facebookApi);
  if (response.user.error) {
    __DEV__ && console.log('error oAuth', response.user.error);
    yield put(LoginActions.oauthFailure(response.user.error.type));
  } else {
    const user = authUser(response.user, authType);
    yield [
      put(LoginActions.oauthSuccess(user, response.credentials.access_token)),
      put(LoginActions.sendRequest(user))
    ];
    yield [
      put(ProfileActions.profileRequest()),
      put(FeedActions.feedRequest()),
      put(ProductsActions.productsRequest()),
      put(FriendsActions.friendsRequest()),
      put(MyBoxesActions.myBoxesRequest())
    ];
  }
}

export function* sendUser(api, action) {
  const { person } = action;
  const response = yield call(api.sendUser, person);
  if (response.ok) {
    yield [put(LoginActions.loginOk('user_provisioned')), put(DeviceActions.deviceRegister())];
  } else {
    __DEV__ && console.log('error sendUser', response.data.error);
    yield put(LoginActions.loginFailure(response.data.error));
  }
}

export function* recover(api, { username }) {
  const response = yield call(api.recoverPassword, username);
  if (response.ok) {
    yield put(LoginActions.loginOk('check_your_mail'));
  } else {
    __DEV__ && console.log('error recover', response.data.error);
    yield put(LoginActions.loginFailure(response.data.error));
  }
}

function facebookApi() {
  return facebook({ appId: '118391794993838', callback: 'fb118391794993838://authorize' })
    .then(response => response)
    .catch(error => error);
}
