import React from 'react';
import { View, WebView } from 'react-native';
import Header from '../Components/Header';
// Styles
import styles from './Styles/WebScreenStyle';
import { Colors } from '../Themes';

export default class WebScreen extends React.Component {

  render() {
    const { uri, title } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header
          title={title}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <WebView
          renderLoading={this.renderLoading}
          startInLoadingState
          source={{ uri }}
          style={{ marginTop: 0 }}
        />
      </View>
    );
  }

}

WebScreen.contextTypes = {
  goBack: React.PropTypes.func,
};
