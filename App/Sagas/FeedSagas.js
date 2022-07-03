import { call, put, select } from 'redux-saga/effects';
import FeedActions from '../Redux/FeedRedux';
import formatFeed from '../Transforms/Feed';

export const selectUser = state => state.login.user;

export function* getFeed(api, { filter }) {
  const user = yield select(selectUser);
  if (!user) return;

  const [feed, counters] = yield [
    call(api.getFeed, filter, user.id),
    call(api.getCounters, user.id),
  ];
  if (feed.ok && counters.ok) {
    const result = Object.values(formatFeed(feed.data));
    yield [
      put(FeedActions.feedSuccess(result)),
      put(FeedActions.countersSuccess(counters.data))
    ];
  } else {
    __DEV__ && console.log('error geFeed', feed.data);
    yield put(FeedActions.feedFailure());
  }
}

export function* getCounters(api) {
  const user = yield select(selectUser);
  if (!user) return;
  const response = yield call(api.getCounters, user.id);
  if (response.ok) {
    yield put(FeedActions.countersSuccess(response.data));
  } else {
    __DEV__ && console.log('error getCounters', response.data);
    yield put(FeedActions.feedFailure());
  }
}