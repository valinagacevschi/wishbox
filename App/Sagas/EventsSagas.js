import { call, put, select } from 'redux-saga/effects';
import EventsActions from '../Redux/EventsRedux';
import formatBoxes from '../Transforms/UserBoxes';

export const selectUser = state => state.login.user;

export function* getEvents(api) {
  const user = yield select(selectUser);
  // make the call to the api
  const response = yield call(api.getEvents, user.id);
  // success?
  if (response.ok) {
    const events = formatBoxes(response.data, user.id);
    yield put(EventsActions.eventsSuccess(events));
  } else {
    yield put(EventsActions.eventsFailure());
  }
}
