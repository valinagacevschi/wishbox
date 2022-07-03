import { call, put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';
import NotesActions from '../Redux/NotesRedux';
import FeedActions from '../Redux/FeedRedux';
import FriendsActions from '../Redux/FriendsRedux';
import formatNotes from '../Transforms/Notes';

export const selectUser = state => state.login.user;

export function* getNotes(api) {
  const user = yield select(selectUser);
  if (!user) return;

  const response = yield call(api.getNotes, user.id);

  if (response.ok) {
    yield put(NotesActions.notesSuccess(formatNotes(response.data)));
  } else {
    __DEV__ && console.log('getNotes', response);
    yield put(NotesActions.notesFailure());
  }
}

export function* markNotes(api) {
  const user = yield select(selectUser);
  const response = yield call(api.markNotes, user.id);

  if (response.ok) {
    yield put(NotesActions.notesSuccess(formatNotes(response.data)));
  } else {
    yield put(NotesActions.notesFailure());
  }
}

export function* markNote(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.markNote, id, user.id);

  if (response.ok) {
    yield [
      put(NotesActions.notesSuccess(formatNotes(response.data))),
      put(FeedActions.countersRequest()),
      put(FriendsActions.friendsRequest()),
    ];
  } else {
    __DEV__ && console.log('error markNote', response);
    yield put(NotesActions.notesFailure());
  }
}

export function* deleteNotes(api, { id }) {
  const user = yield select(selectUser);
  const response = yield call(api.deleteNotes, id, user.id);

  if (response.ok) {
    yield put(NotesActions.notesSuccess(formatNotes(response.data)));
    Toast.showWithGravity(I18n.t('deleteNotesSuccess'), Toast.LONG, Toast.CENTER);
  } else {
    yield put(NotesActions.notesFailure());
    Toast.showWithGravity(I18n.t('deleteNotesError'), Toast.LONG, Toast.CENTER);
  }
}
