import React from 'react';
import { View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import I18n from 'react-native-i18n';

import LoginActions from '../Redux/LoginRedux';
import RoundedButton from '../Components/RoundedButton';
import Link from '../Components/Link';

import Styles from './Styles/LoginScreenStyles';
import { Images, Colors } from '../Themes';

class RecoverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: __DEV__ ? 'vali@experiment.ro' : null
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps(newProps) {
    if (this.isAttempting && !newProps.fetching && newProps.noError) {
      this.context.reset('main');
    }
  }

  isAttempting = false;

  handlePressRecover = () => {
    if (this.state.username) {
      this.isAttempting = true;
      this.props.attemptRecover(this.state.username);
      Toast.showWithGravity(I18n.t('recoverSent'), Toast.LONG, Toast.CENTER);
    } else {
      Toast.showWithGravity(I18n.t('incorrectInfo'), Toast.LONG, Toast.CENTER);
    }
  };

  handleChangeUsername = text => {
    this.setState({ username: text });
  };

  render() {
    const { username } = this.state;
    return (
      <View style={Styles.mainContainer}>
        <Image source={Images.topBgr} resizeMode="cover" style={Styles.topBgr} />
        <Image source={Images.decoration} resizeMode="cover" style={Styles.decoration} />
        <KeyboardAwareScrollView
          contentContainerStyle={{ justifyContent: 'center' }}
          style={Styles.container}
        >
          <Image source={Images.topLogo} style={Styles.topLogo} />
          <View style={Styles.form}>
            <View style={Styles.row}>
              <Sae
                label={I18n.t('email')}
                labelStyle={Styles.labelStyle}
                style={Styles.inputStyle}
                iconClass={FontAwesomeIcon}
                iconName={'envelope'}
                iconColor={Colors.wish}
                autoCapitalize="none"
                autoCorrect={false}
                ref="username"
                value={username}
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                returnKeyType="go"
                onChangeText={this.handleChangeUsername}
                onSubmitEditing={this.handlePressRecover}
              />
            </View>

            <View style={[Styles.loginRow]}>
              <RoundedButton onPress={this.handlePressRecover} text={I18n.t('recoverPassword')} />
              <Link
                text={I18n.t('rememberPassword')}
                style={{ borderBottomWidth: 0, marginTop: 20 }}
                textStyle={{ color: Colors.wish, fontWeight: 'bold' }}
                onPress={() => this.context.reset('login')}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Link
          style={[Styles.link, Styles.bottomLink]}
          textStyle={Styles.linkText}
          text={I18n.t('dontHaveAccount')}
          onPress={() => this.context.reset('register')}
        />
      </View>
    );
  }
}

RecoverScreen.contextTypes = {
  reset: React.PropTypes.func
  // goBack: React.PropTypes.func,
};

const mapStateToProps = state => ({
  fetching: state.login.fetching,
  noError: state.login.error === null
});

const mapDispatchToProps = dispatch => ({
  attemptRecover: username => dispatch(LoginActions.recoverRequest(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverScreen);
