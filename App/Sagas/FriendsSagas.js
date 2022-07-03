import { call, put, select } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import I18n from 'react-native-i18n';
import FriendsActions from '../Redux/FriendsRedux';
import FeedActions from '../Redux/FeedRedux';
import formatUsers, { formatInvites } from '../Transforms/User';

export const selectUser = state => state.login.user;

export function* getFriends(api) {
  const user = yield select(selectUser);
  if (!user) return;

  const response = yield call(api.getFriends, user.id);

  if (response.ok) {
    const { connections, friends, requests, sent, likes, invites } = response.data;
    const payload = {
      friends: formatUsers(friends),
      requests: {
        requests: formatUsers(requests),
        sent: formatUsers(sent),
        invites: formatInvites(invites),
      },
      connections: formatUsers(connections),
      likes
    };
    yield put(FriendsActions.friendsSuccess(payload));
  } else {
    __DEV__ && console.log('error response', response);
    yield put(FriendsActions.friendsFailure());
  }
}

export function* searchFriends(api, { searchTerm }) {
  const user = yield select(selectUser);
  const response = yield call(api.searchFriends, searchTerm, user.id);
  if (response.ok) {
    yield put(FriendsActions.friendsResults(formatUsers(response.data)));
  } else {
    __DEV__ && console.log('error response', response);
    yield put(FriendsActions.friendsFailure());
  }
}

export function* sendInvite(api, { email }) {
  const user = yield select(selectUser);
  const response = yield call(api.sendInvite, email, user.id);
  if (response.ok) {
    yield put(FriendsActions.friendsOk());
    Toast.showWithGravity(I18n.t('sent_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error sendInvite', response);
    Toast.showWithGravity(I18n.t('error_sent_invite'), Toast.LONG, Toast.CENTER);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}

export function* accept(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.accept, id, user.id);

  if (response.ok) {
    yield [
      put(FeedActions.countersRequest()),
      put(FriendsActions.friendsOk()), 
      put(FriendsActions.friendsRequest()),
    ];
    Toast.showWithGravity(I18n.t('accept_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error accept response', response);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}

export function* refuse(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.refuse, id, user.id);

  if (response.ok) {
    yield [put(FriendsActions.friendsOk()), put(FriendsActions.friendsRequest())];
    Toast.showWithGravity(I18n.t('refuse_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error refuse response', response.data);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}

export function* invite(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.invite, id, user.id);
  if (response.ok) {
    yield [put(FriendsActions.friendsOk()), put(FriendsActions.friendsRequest())];
    Toast.showWithGravity(I18n.t('invite_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error invite', response.data);
    Toast.showWithGravity(I18n.t('error_sent_invite'), Toast.LONG, Toast.CENTER);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}

export function* unfriend(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.unfriend, id, user.id);

  if (response.ok) {
    yield [put(FriendsActions.friendsOk()), put(FriendsActions.friendsRequest())];
    Toast.showWithGravity(I18n.t('unfriend_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error unfriend response', response.data);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}

export function* cancel(api, { id, cat }) {
  const user = yield select(selectUser);
  const response = yield call(api.cancelInvite, id, cat, user.id);

  if (response.ok) {
    yield [put(FriendsActions.friendsOk()), put(FriendsActions.friendsRequest())];
    Toast.showWithGravity(I18n.t('cancel_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error cancel response', response.data);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}

export function* resend(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.resendInvite, id, user.id);

  if (response.ok) {
    yield [put(FriendsActions.friendsOk()), put(FriendsActions.friendsRequest())];
    Toast.showWithGravity(I18n.t('resend_ok'), Toast.LONG, Toast.CENTER);
  } else {
    __DEV__ && console.log('error resend response', response.data);
    yield put(FriendsActions.friendsNok(response.data && response.data.message));
  }
}
