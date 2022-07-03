import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import AppNavigator from '../Navigation/AppNavigator';
import NavActions from '../Redux/NavRedux';
import Spinner from '../Components/Spinner';

const tracker = new GoogleAnalyticsTracker('UA-108847800-1');

class RootContainer extends Component {
  getChildContext = () => ({
    goTo: this.goTo.bind(this),
    goBack: this.goBack.bind(this),
    reset: this.reset.bind(this)
  });

  componentDidMount() {
    tracker.trackScreenView('home');
    this.props.provideController({
      goTo: this.goTo.bind(this),
      goBack: this.goBack.bind(this),
      reset: this.reset.bind(this)
    });    
  }

  componentWillUnmount() {
    this.props.provideController(null);
  }

  onNavigationChange = (prevState, newState, action) => {
    if (action.type === 'Navigation/NAVIGATE') {
      const { routeName, params } = action;
      this.props.route(routeName, params);
      tracker.trackScreenView(routeName);
      tracker.trackEvent(Platform.OS, routeName);
    }
  }

  goBack = () => {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.back());
    }
  };

  goTo = (routeName, params = null) => {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.navigate({ routeName, params }));
    }
  };

  reset = routeName => {
    if (this.navigator) {
      this.navigator.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName })]
        })
      );
    }
  };

  render() {
    if (!this.props.rehidrated) return <Spinner />;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(88, 65, 128, 0.9)" />
        <AppNavigator 
          ref={nav => (this.navigator = nav)}
          onNavigationStateChange={this.onNavigationChange} 
        />
      </View>
    );
  }
}

RootContainer.childContextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func,
  reset: React.PropTypes.func
};

const mapStateToProps = state => ({
  rehidrated: state.startup.rehidrated,
  tutorialOn: state.profile.tutorialOn,
});

const mapDispatchToProps = dispatch => ({
  route: (routeName, params) => dispatch(NavActions.navRoute(routeName, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
