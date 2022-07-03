import React, { Component } from 'react';
import { AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import FeedActions from '../Redux/FeedRedux';
import FriendsActions from '../Redux/FriendsRedux';
import NotesActions from '../Redux/NotesRedux';
import DeviceActions from '../Redux/DeviceRedux';

import RootContainer from './RootContainer';
// import { routeTo } from '../Config';

class WrapperContainer extends Component {
  constructor(props) {
    super(props);
    PushNotification.configure({
      onRegister: ({ token, os }) => {
        __DEV__ && console.log('registering', token, os);
        props.setToken(token, os);
      },

      onNotification: notification => {
        PushNotification.setApplicationIconBadgeNumber(0);
        const { foreground, message, alert, data } = notification;

        this.setState({ message: message || alert, path: null });
        if (foreground) {
          // foreground
          this.props.loadCounters();
          this.props.getNotes();
          Toast.showWithGravity(this.state.message, Toast.LONG, Toast.CENTER);
        } else if (data.forward) {
          // routeTo(data.forward, props, this.ctl.goTo);
          this.ctl.goTo('messages');
        }
        __DEV__ && console.log('forward', data && data.forward);
      },
      senderID: '715367291418',
      permissions: { alert: true, badge: true, sound: true },
      popInitialNotification: true,
      requestPermissions: true
    });
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // setTimeout(() => {
    //   routeTo('requests', this.props, this.goTo);
    //   routeTo('boxItem/950', this.props, this.goTo);
    //   routeTo('box/303');
    //   routeTo('boxItem/841');
    //   routeTo('friends', this.props, this.ctl.goTo);
    // }, 5000);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = appState => {
    if (appState !== 'active') {
      PushNotification.setApplicationIconBadgeNumber(0);
    } else {
      this.props.loadCounters();
      this.props.loadFriends();
    }
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
