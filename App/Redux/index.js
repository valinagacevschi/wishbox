import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

import { reducer as startup } from './StartupRedux';
import { reducer as nav } from './NavRedux';
// import { reducer as routes } from './RoutesRedux';
import { reducer as login } from './LoginRedux';
import { reducer as device } from './DeviceRedux';
import { reducer as feed } from './FeedRedux';
import { reducer as friends } from './FriendsRedux';
import { reducer as myboxes } from './MyBoxesRedux';
import { reducer as userBoxes } from './UserBoxesRedux';
import { reducer as boxItem } from './BoxItemRedux';
import { reducer as products } from './ProductsRedux';
import { reducer as notes } from './NotesRedux';
import { reducer as search } from './SearchRedux';
import { reducer as profile } from './ProfileRedux';
import { reducer as members } from './MembersRedux';
import { reducer as subscriptions } from './SubscriptionsRedux';
import { reducer as events } from './EventsRedux';
import { reducer as webimages } from './WebImagesRedux';
import { reducer as webproducts } from './WebProductsRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    // routes,
    startup,
    nav,
    login,
    device,
    feed,
    friends,
    myboxes,
    userBoxes,
    boxItem,
    products,
    notes,
    search,
    profile,
    members,
    subscriptions,
    events,
    webimages,
    webproducts,
  });

  return configureStore(rootReducer, rootSaga);
};
