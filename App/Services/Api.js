// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import Config from 'react-native-config';

// let ROOT = `${Config.baseUrl}/wb/`;
let ROOT = 'https://example.com/wb/';
if (__DEV__ && false) {
  ROOT = 'http://127.0.0.1:3000/wb/';
}

// our "constructor"
const create = (baseURL = ROOT) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      // 'Cache-Control': 'no-cache',
      secret: Config.secret
    },
    timeout: 5000
  });

  const registerUser = (username, password) =>
    api.post('app_wishbox/register', { username, password });
  const recoverPassword = username => api.post('app_wishbox/recover', { username });

  const loginUser = (username, password) => api.post('app_wishbox/login', { username, password });
  const sendUser = params => api.post('app_wishbox/user', params);
  const deviceRegister = (deviceId, token, os, uid) => {
    __DEV__ && console.log('deviceRegister', deviceId, token, os, uid);
    return api.post('app_wishbox/device_register', { deviceId, token, os }, { headers: { uid } });
  };
  const getFeed = (filter, uid) => {
    __DEV__ && console.log('getFeed', uid);
    return api.get('app_wishbox/', { filter }, { headers: { uid } });
  };
  const getFriends = uid => {
    __DEV__ && console.log('getFriends', uid);
    return api.get('app_wishbox/connections', {}, { headers: { uid } });
  };
  const searchFriends = (term, uid) => {
    __DEV__ && console.log('searchFriends', term, uid);
    return api.get('app_wishbox/search_friends', { term }, { headers: { uid } });
  };
  const sendInvite = (email, uid) => {
    __DEV__ && console.log('sendInvite', email, uid);
    return api.post('app_wishbox/send_invite', { email }, { headers: { uid } });
  };
  const accept = (id, uid) => {
    __DEV__ && console.log('accept', id, uid);
    return api.post('app_wishbox/accept', { id }, { headers: { uid } });
  };
  const refuse = (id, uid) => {
    __DEV__ && console.log('refuse', id, uid);
    return api.post('app_wishbox/refuse', { id }, { headers: { uid } });
  };
  const invite = (id, uid) => {
    __DEV__ && console.log('invite', id, uid);
    return api.post('app_wishbox/invite', { id }, { headers: { uid } });
  };
  const unfriend = (id, uid) => {
    __DEV__ && console.log('unfriend', id, uid);
    return api.post('app_wishbox/unfriend', { id }, { headers: { uid } });
  };
  const cancelInvite = (id, cat, uid) => {
    __DEV__ && console.log('cancelInvite', id, cat, uid);
    return api.post('app_wishbox/cancel_invite', { id, cat }, { headers: { uid } });
  };
  const resendInvite = (id, uid) => {
    __DEV__ && console.log('resendInvite', id, uid);
    return api.post('app_wishbox/resend_invite', { id }, { headers: { uid } });
  };
  const getMyBoxes = uid => {
    __DEV__ && console.log('getMyBoxes', uid);
    return api.get('app_wishbox/my_boxes', {}, { headers: { uid } });
  };
  const getBox = (id, uid) => {
    __DEV__ && console.log('getBox', id, uid);
    return api.get('app_wishbox/get_box', { id }, { headers: { uid } });
  };
  const createBox = (name, date, uid) => {
    __DEV__ && console.log('createBox', name, date, uid);
    return api.post('app_wishbox/add_box', { name, date }, { headers: { uid } });
  };
  const deleteBox = (id, uid) => {
    __DEV__ && console.log('deleteBox', id, uid);
    return api.post('app_wishbox/del_box', { id }, { headers: { uid } });
  };
  const setBoxDate = (id, date, uid) => {
    __DEV__ && console.log('setBoxDate', id, date, uid);
    return api.post('app_wishbox/set_box_date', { id, date }, { headers: { uid } });
  };
  const toggleBoxPrivate = (id, uid) => {
    __DEV__ && console.log('toggleBoxPrivate', id, uid);
    return api.post('app_wishbox/toggle_private', { id }, { headers: { uid } });
  };
  const addItem = (id, item, uid) => {
    __DEV__ && console.log('addItem', id, item, uid);
    return api.post('app_wishbox/add_item', { id, item }, { headers: { uid } });
  };
  const delItem = (id, uid) => {
    __DEV__ && console.log('delItem', id, uid);
    return api.post('app_wishbox/del_item', { id }, { headers: { uid } });
  };
  const getUserBoxes = (id, uid) => {
    __DEV__ && console.log('getUserBoxes', uid, id);
    return api.get('app_wishbox/user_boxes', { id }, { headers: { uid } });
  };
  const getComments = (id, uid) => {
    __DEV__ && console.log('getComments', uid, id);
    return api.get('app_wishbox/get_comments', { id }, { headers: { uid } });
  };
  const addComment = (id, comment, privated, uid) => {
    __DEV__ && console.log('addComment', comment, privated, uid, id);
    return api.get(
      'app_wishbox/add_comment',
      { id, comment, private: privated },
      { headers: { uid } }
    );
  };
  const addLike = (id, added, uid) => {
    __DEV__ && console.log('addLike', uid, id, 'added', added);
    id = added ? id : -id;
    return api.get('app_wishbox/add_like', { id }, { headers: { uid } });
  };
  const getNotes = uid => {
    __DEV__ && console.log('getNotes', uid);
    return api.get('app_wishbox/get_notes', {}, { headers: { uid } });
  };
  const deleteNotes = (id, uid) => {
    __DEV__ && console.log('deleteNotes', uid, id);
    return api.get('app_wishbox/delete_note', { id }, { headers: { uid } });
  };
  const markNote = (id, uid) => {
    __DEV__ && console.log('markNote', uid, id);
    return api.get('app_wishbox/mark_note', { id }, { headers: { uid } });
  };
  const markNotes = uid => {
    __DEV__ && console.log('markNotes', uid);
    return api.get('app_wishbox/mark_notes', {}, { headers: { uid } });
  };
  const getProducts = uid => {
    __DEV__ && console.log('getProducts', uid);
    return api.get('app_wishbox/get_products', {}, { headers: { uid } });
  };
  const searchProducts = (id, uid) => {
    __DEV__ && console.log('searchProducts', uid, id);
    return api.get('app_wishbox/search_products', { id }, { headers: { uid } });
  };
  const suggestProduct = (params, uid) => {
    __DEV__ && console.log('suggestProduct', params, uid);
    return api.post('app_wishbox/suggest_product', params, { headers: { uid } });
  };
  const addProduct = (params, uid) => {
    __DEV__ && console.log('addProduct', params, uid);
    return api.post('app_wishbox/add_product', params, { headers: { uid } });
  };
  const removeProduct = (params, uid) => {
    __DEV__ && console.log('removeProduct', params, uid);
    return api.post('app_wishbox/remove_product', params, { headers: { uid } });
  };
  const subscribe = (id, split, uid) => {
    __DEV__ && console.log('subscribe', id, split, uid);
    return api.post('app_wishbox/subscribe', { id, split }, { headers: { uid } });
  };
  const unsubscribe = (id, uid) => {
    __DEV__ && console.log('unsubscribe', id, uid);
    return api.post('app_wishbox/unsubscribe', { id }, { headers: { uid } });
  };
  const getBoxItem = (id, uid) => {
    __DEV__ && console.log('getBoxItem', id, uid);
    return api.post('app_wishbox/get_box_item', { id }, { headers: { uid } });
  };
  const updateBoxItem = (id, status, uid) => {
    __DEV__ && console.log('unsubscribe', id, status, uid);
    return api.post('app_wishbox/chg_boxitem_status', { id, status }, { headers: { uid } });
  };

  const getCounters = uid => {
    __DEV__ && console.log('getCounters', uid);
    return api.get('app_wishbox/counters', {}, { headers: { uid } });
  };
  const getProfile = uid => {
    __DEV__ && console.log('getProfile', uid);
    return api.get('app_wishbox/get_profile', {}, { headers: { uid } });
  };
  const saveProfile = (params, uid) => {
    __DEV__ && console.log('saveProfile', params, uid);
    return api.post('app_wishbox/save_profile', params, { headers: { uid } });
  };
  const getSubscriptions = uid => {
    __DEV__ && console.log('getSubscriptions', uid);
    return api.get('app_wishbox/my_subscriptions', {}, { headers: { uid } });
  };
  const getMembers = (id, uid) => {
    __DEV__ && console.log('getMembers', id, uid);
    return api.get('app_wishbox/private_users', { id }, { headers: { uid } });
  };
  const switchMember = (params, uid) => {
    __DEV__ && console.log('switchMember', params, uid);
    return api.post('app_wishbox/switch_private_user', params, { headers: { uid } });
  };
  const getEvents = uid => {
    __DEV__ && console.log('getEvents', uid);
    return api.get('app_wishbox/my_events', {}, { headers: { uid } });
  };

  const getWebImages = query => {
    __DEV__ && console.log('getWebImages', query);
    return api.post('app_utility/remote_post/get-images', { remote: { query } });
  };
  const saveWebImages = link => {
    __DEV__ && console.log('saveWebImages', link);
    return api.post('app_utility/save_from_link/', { link });
  };

  const getWebProducts = query => {
    __DEV__ && console.log('getWebProducts', query);
    return api.post('app_utility/remote_post/get-images', { remote: { query } });
  };

  return {
    registerUser,
    recoverPassword,
    loginUser,
    sendUser,
    deviceRegister,
    getFeed,
    getFriends,
    searchFriends,
    sendInvite,
    accept,
    refuse,
    invite,
    unfriend,
    cancelInvite,
    resendInvite,
    getMyBoxes,
    getBox,
    createBox,
    deleteBox,
    setBoxDate,
    toggleBoxPrivate,
    addItem,
    delItem,
    getUserBoxes,
    getComments,
    addComment,
    addLike,
    getNotes,
    markNotes,
    markNote,
    deleteNotes,
    searchProducts,
    getProducts,
    suggestProduct,
    addProduct,
    removeProduct,
    subscribe,
    unsubscribe,
    getBoxItem,
    updateBoxItem,
    getProfile,
    saveProfile,
    getSubscriptions,
    getMembers,
    switchMember,
    getEvents,
    getWebImages,
    saveWebImages,
    getWebProducts,
    getCounters,
  };
};

export default { create };
