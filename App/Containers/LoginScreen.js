import React from 'react';
import { View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import I18n from 'react-native-i18n';

import Styles from './Styles/LoginScreenStyles';
import { Images, Colors } from '../Themes';
import LoginActions from '../Redux/LoginRedux';
import RoundedButton from '../Components/RoundedButton';
import Link from '../Components/Link';

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: __DEV__ ? 'vali@experiment.ro' : null,
      password: __DEV__ ? 'cacapipi' : null,
    };
    this.isAttempting = false;
  }

  componentDidMount() {
    if (this.props.firstTime) {
      setTimeout(() => this.context.goTo('intro'), 0);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn) {
      this.context.reset('main');
    }
  }

  handlePressLogin = () => {
    const { username, password } = this.state;
    if (username && password) {
      this.isAttempting = true;
      this.props.attemptLogin(username, password);
    } else {
      Toast.showWithGravity(I18n.t('incorrectInfo'), Toast.LONG, Toast.CENTER);
    }
  };

  handlePressFacebook = () => {
    this.props.facebookLogin();
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text });
  }

  handleChangePassword = (text) => {
    this.setState({ password: text });
  }

  render() {
    const { username, password } = this.state;
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
                autoCapitalize='none'
                autoCorrect={false}
                ref='username'
                value={username}
                keyboardType='email-address'
                underlineColorAndroid='transparent'
                returnKeyType='next'
                onChangeText={this.handleChangeUsername}
                onSubmitEditing={() => this.refs.password.focus()}
            />
            </View>

            <View style={Styles.row}>
              <Sae
                  label={I18n.t('password')}
                  labelStyle={Styles.labelStyle}
                  style={Styles.inputStyle}
                  iconClass={FontAwesomeIcon}
                  iconName={'key'}
                  iconColor={Colors.wish}
                  autoCapitalize='none'
                  autoCorrect={false}
                  ref='password'
                  value={password}
                  keyboardType='default'
                  returnKeyType='go'
                  secureTextEntry
                  onChangeText={this.handleChangePassword}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={this.handlePressLogin}
              />
            </View>

            <View style={Styles.loginRow}>
              <RoundedButton onPress={this.handlePressLogin} text={I18n.t('login')} />

              <FontAwesomeIcon.Button
                name="facebook-square" style={Styles.facebook}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={this.handlePressFacebook}
              >
                <Text style={Styles.fbText}>{I18n.t('fbLogin')}</Text>
              </FontAwesomeIcon.Button>

              <Link
                text={I18n.t('forgotPassword')}
                style={Styles.link}
                textStyle={Styles.linkText}
                onPress={() => this.context.reset('recover')}
              />
              <Link
                style={[Styles.link]}
                text={I18n.t('dontHaveAccount')}
                textStyle={Styles.linkText}
                onPress={() => this.context.reset('register')}
              />

            </View>
          </View>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

LoginScreen.contextTypes = {
  goTo: React.PropTypes.func,
  reset: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
  firstTime: state.login.firstTime,
  isLoggedIn: state.login.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
  facebookLogin: () => dispatch(LoginActions.oauthRequest('facebook'))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
