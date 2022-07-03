import React, { Component } from 'react';
import { BackHandler, AppState } from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
import { NotificationsAndroid, PendingNotifications } from 'react-native-notifications';
import Toast from 'react-native-simple-toast';
import StatusBarAndroid from 'react-native-android-statusbar';
import DeviceActions from '../Redux/DeviceRedux';
import FeedActions from '../Redux/FeedRedux';
import FriendsActions from '../Redux/FriendsRedux';
import NotesActions from '../Redux/NotesRedux';
// import { routeTo } from '../Config';

import RootContainer from './RootContainer';

let mainScreen;

function onPushRegistered(deviceToken) {
  if (mainScreen) {
    mainScreen.onPushRegistered(deviceToken);
  }
}

function onNotificationReceived(notification) {
  if (mainScreen) {
    mainScreen.onNotificationReceived(notification);
  }
}

function onNotificationOpened(notification) {
  if (mainScreen) {
    mainScreen.onNotificationOpened(notification);
  }
}

NotificationsAndroid.setRegistrationTokenUpdateListener(onPushRegistered);
NotificationsAndroid.setNotificationReceivedListener(onNotificationReceived);
NotificationsAndroid.setNotificationOpenedListener(onNotificationOpened);

class WrapperContainer extends Component {
  constructor(props) {
    super(props);
    mainScreen = this;
    this.state = { backPress: false };
    this.onPushRegistered = this.onPushRegistered.bind(this);
    this.onNotificationReceived = this.onNotificationReceived.bind(this);
    this.onNotificationOpened = this.onNotificationOpened.bind(this);
  }

  componentDidMount() {
    StatusBarAndroid.setHexColor('#1e0055ee');
    AppState.addEventListener('change', this.handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    PendingNotifications.getInitialNotification()
      .then(notification => {
        __DEV__ && console.log('PendingNotifications.getInitialNotification:', notification);
        if (notification) {
          setTimeout(() => {
            this.processNote(notification);
          }, 3000);
        }
      })
      .catch(err => console.log('getInitialNotifiation failed', err));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  onPushRegistered = deviceToken => {
    __DEV__ && console.log('Push-notifications registered!', deviceToken);
    this.props.setToken(deviceToken, 'android');
  };

  onNotificationReceived = notification => {
    __DEV__ && console.log('Notification received on device', AppState.currentState, notification.getData());
    if (AppState.currentState === 'active') {
      this.props.loadCounters();
      this.props.getNotes();
      const { title, message: msg, alert } = notification.getData();
      const message = title || msg || alert;
      Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
    } else {
      this.processNote(notification);
    }
  };

  onNotificationOpened = notification => {
    __DEV__ && console.log('Notification opened by device user', notification.getData());
    this.processNote(notification);
  };

  processNote = notification => {
    const { title, message, alert, other } = notification.getData();
    const path = JSON.parse(other).forward;
    this.setState({ message: title || message || alert, path }, () =>
      Toast.showWithGravity(this.state.message, Toast.LONG, Toast.CENTER)
    );
    if (path) {
      this.ctl.goTo('messages');
      // routeTo(path, this.props, this.ctl.goTo);
    }
  };

  handleAppStateChange = appState => {
    if (appState === 'active') {
      this.props.loadCounters();
      this.props.loadFriends();
    }
  }

  handleBackPress = () => {
    if (!this.state.backPress) {
      const that = this;
      Toast.showWithGravity('Back again to exit', Toast.SHORT, Toast.CENTER);
      this.setState({ backPress: true });
      setTimeout(() => {
        that.setState({ backPress: false });
      }, 1500);
    } else {
      return false;
    }
    return true;
  };

  render() {
    return (
      <RootContainer provideController={ctl => (this.ctl = ctl)} />
    );
  }
}

WrapperContainer.contextTypes = {
  goTo: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  loadFeed: filter => dispatch(FeedActions.feedRequest(filter)),
  loadCounters: () => dispatch(FeedActions.countersRequest()),
  loadFriends: () => dispatch(FriendsActions.friendsRequest()),  
  getNotes: () => dispatch(NotesActions.notesRequest()),
  setToken: (token, os) => dispatch(DeviceActions.setToken(token, os)),
});

export default connect(null, mapDispatchToProps)(WrapperContainer);
