import React, { Component } from 'react';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import WrapperContainer from './WrapperContainer';
import createStore from '../Redux';
// import config from '../Config';

// create our store
const store = createStore();

const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <WrapperContainer />
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(App);
