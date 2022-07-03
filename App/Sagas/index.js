import { takeLatest } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { LoginTypes } from '../Redux/LoginRedux';
import { DeviceTypes } from '../Redux/DeviceRedux';
import { FeedTypes } from '../Redux/FeedRedux';
import { FriendsTypes } from '../Redux/FriendsRedux';
import { MyBoxesTypes } from '../Redux/MyBoxesRedux';
import { UserBoxesTypes } from '../Redux/UserBoxesRedux';
import { BoxItemTypes } from '../Redux/BoxItemRedux';
import { ProductsTypes } from '../Redux/ProductsRedux';
import { NotesTypes } from '../Redux/NotesRedux';
import { ProfileTypes } from '../Redux/ProfileRedux';
import { MembersTypes } from '../Redux/MembersRedux';
import { SubscriptionsTypes } from '../Redux/SubscriptionsRedux';
import { EventsTypes } from '../Redux/EventsRedux';
import { WebImagesTypes } from '../Redux/WebImagesRedux';
import { WebProductsTypes } from '../Redux/WebProductsRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { register, recover, login, logout, oAuth, sendUser } from './LoginSagas';
import { setToken, deviceRegister } from './DeviceSagas';
import { getFeed, getCounters } from './FeedSagas';
import {
  getFriends,
  searchFriends,
  sendInvite,
  accept,
  refuse,
  invite,
  unfriend,
  cancel,
  resend
} from './FriendsSagas';
import {
  getMyBoxes,
  // getMyBox,
  createBox,
  deleteBox,
  setBoxDate,
  toggleBoxPrivate,
  addItem,
  delItem
} from './MyBoxesSagas';
import { getUserBoxes, getUserBox } from './UserBoxesSagas';
import {
  getBoxItem,
  getComments,
  addComment,
  addLike,
  subscribe,
  unsubscribe,
  acceptItem,
  reject,
  received,
  purchased
} from './BoxItemSagas';
import { getNotes, markNotes, markNote, deleteNotes } from './NotesSagas';
import {
  getProducts,
  searchProducts,
  suggestProduct,
  addProduct,
  removeProduct
} from './ProductsSagas';
import { getProfile, saveProfile } from './ProfileSagas';
import { getMembers, switchMember } from './MembersSagas';
import { getSubscriptions } from './SubscriptionsSagas';
import { getEvents } from './EventsSagas';
import { getWebImages, saveWebImages } from './WebImagesSagas';
import { getWebProducts } from './WebProductsSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.OAUTH_REQUEST, oAuth),
    takeLatest(LoginTypes.REGISTER_REQUEST, register, api),
    takeLatest(LoginTypes.RECOVER_REQUEST, recover, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LoginTypes.SEND_REQUEST, sendUser, api),

    takeLatest(DeviceTypes.DEVICE_REGISTER, deviceRegister, api),

    takeLatest(FeedTypes.FEED_REQUEST, getFeed, api),
    takeLatest(FeedTypes.COUNTERS_REQUEST, getCounters, api),

    takeLatest(FriendsTypes.FRIENDS_REQUEST, getFriends, api),
    takeLatest(FriendsTypes.SEND_INVITE, sendInvite, api),
    takeLatest(FriendsTypes.FRIENDS_SEARCH, searchFriends, api),

    takeLatest(FriendsTypes.FRIENDS_ACCEPT, accept, api),
    takeLatest(FriendsTypes.FRIENDS_REFUSE, refuse, api),
    takeLatest(FriendsTypes.FRIENDS_INVITE, invite, api),
    takeLatest(FriendsTypes.FRIENDS_UNFRIEND, unfriend, api),
    takeLatest(FriendsTypes.FRIENDS_CANCEL, cancel, api),
    takeLatest(FriendsTypes.FRIENDS_RESEND, resend, api),

    takeLatest(MyBoxesTypes.MY_BOXES_REQUEST, getMyBoxes, api),
    // takeLatest(MyBoxesTypes.MY_BOX_REQUEST, getMyBox, api),
    takeLatest(MyBoxesTypes.MY_BOXES_CREATE, createBox, api),
    takeLatest(MyBoxesTypes.MY_BOXES_DELETE, deleteBox, api),
    takeLatest(MyBoxesTypes.MY_BOXES_SET_DATE, setBoxDate, api),
    takeLatest(MyBoxesTypes.MY_BOXES_TOGGLE, toggleBoxPrivate, api),
    takeLatest(MyBoxesTypes.MY_BOXES_ADD_ITEM, addItem, api),
    takeLatest(MyBoxesTypes.MY_BOXES_DEL_ITEM, delItem, api),

    takeLatest(UserBoxesTypes.USER_BOXES_REQUEST, getUserBoxes, api),
    takeLatest(UserBoxesTypes.USER_BOX_REQUEST, getUserBox, api),

    takeLatest(BoxItemTypes.BOX_ITEM_REQUEST, getBoxItem, api),
    takeLatest(BoxItemTypes.BOX_ITEM_COMM_REQUEST, getComments, api),
    takeLatest(BoxItemTypes.BOX_ITEM_ADD_COMM_REQUEST, addComment, api),
    takeLatest(BoxItemTypes.BOX_ITEM_ADD_LIKE_REQUEST, addLike, api),
    takeLatest(BoxItemTypes.BOX_ITEM_SUBSCRIBE, subscribe, api),
    takeLatest(BoxItemTypes.BOX_ITEM_UNSUBSCRIBE, unsubscribe, api),

    takeLatest(BoxItemTypes.BOX_ITEM_ACCEPT, acceptItem, api),
    takeLatest(BoxItemTypes.BOX_ITEM_REJECT, reject, api),
    takeLatest(BoxItemTypes.BOX_ITEM_RECEIVED, received, api),
    takeLatest(BoxItemTypes.BOX_ITEM_PURCHASED, purchased, api),

    takeLatest(NotesTypes.NOTES_REQUEST, getNotes, api),
    takeLatest(NotesTypes.NOTES_MARK_ALL, markNotes, api),
    takeLatest(NotesTypes.NOTES_MARK, markNote, api),
    takeLatest(NotesTypes.NOTES_DELETE, deleteNotes, api),

    takeLatest(ProductsTypes.PRODUCTS_SEARCH, searchProducts, api),
    takeLatest(ProductsTypes.PRODUCTS_REQUEST, getProducts, api),
    takeLatest(ProductsTypes.PRODUCT_SUGGEST, suggestProduct, api),
    takeLatest(ProductsTypes.PRODUCT_ADD, addProduct, api),
    takeLatest(ProductsTypes.PRODUCT_REMOVE, removeProduct, api),

    takeLatest(ProfileTypes.PROFILE_REQUEST, getProfile, api),
    takeLatest(ProfileTypes.PROFILE_SAVE, saveProfile, api),

    takeLatest(MembersTypes.MEMBERS_REQUEST, getMembers, api),
    takeLatest(MembersTypes.MEMBERS_SWITCH, switchMember, api),

    takeLatest(SubscriptionsTypes.SUBSCRIPTIONS_REQUEST, getSubscriptions, api),

    takeLatest(EventsTypes.EVENTS_REQUEST, getEvents, api),

    takeLatest(WebImagesTypes.WEB_IMAGES_REQUEST, getWebImages, api),
    takeLatest(WebImagesTypes.WEB_IMAGES_SAVE, saveWebImages, api),

    takeLatest(WebProductsTypes.WEB_PRODUCTS_REQUEST, getWebProducts, api)
  ];
}
