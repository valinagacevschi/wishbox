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

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: __DEV__ ? 'vali@appcenter.ro' : null,
      password: __DEV__ ? 'cacapipi' : null,
      comfirm: __DEV__ ? 'cacapipi' : null
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn) {
      this.context.reset('main');
    }
  }

  handlePressRegister = () => {
    const { username, password, comfirm } = this.state;
    if (username && password && comfirm && password === comfirm) {
      this.props.attemptRegister(username, password);
    } else {
      Toast.showWithGravity(I18n.t('incorrectInfo'), Toast.LONG, Toast.CENTER);
    }
  };

  handleChangeUsername = text => {
    this.setState({ username: text });
  };

  handleChangePassword = text => {
    this.setState({ password: text });
  };

  handleChangeComfirm = text => {
    this.setState({ comfirm: text });
  };

  render() {
    const { username, password, comfirm } = this.state;
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
                returnKeyType="next"
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
                autoCapitalize="none"
                autoCorrect={false}
                ref="password"
                value={password}
                keyboardType="default"
                returnKeyType="next"
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid="transparent"
                onSubmitEditing={() => this.refs.comfirm.focus()}
              />
            </View>

            <View style={Styles.row}>
              <Sae
                label={I18n.t('comfirmPassword')}
                labelStyle={Styles.labelStyle}
                style={Styles.inputStyle}
                iconClass={FontAwesomeIcon}
                iconName={'key'}
                iconColor={Colors.wish}
                autoCapitalize="none"
                autoCorrect={false}
                ref="comfirm"
                value={comfirm}
                keyboardType="default"
                returnKeyType="go"
                secureTextEntry
                onChangeText={this.handleChangeComfirm}
                underlineColorAndroid="transparent"
                onSubmitEditing={this.handlePressRegister}
              />
            </View>

            <View style={[Styles.loginRow]}>
              <RoundedButton onPress={this.handlePressRegister} text={I18n.t('register')} />

              <FontAwesomeIcon.Button
                name="facebook-square"
                style={Styles.facebook}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={() => this.props.facebookLogin()}
              >
                <Text style={Styles.fbText}>{I18n.t('fbLogin')}</Text>
              </FontAwesomeIcon.Button>
              <Link
                style={[Styles.link]}
                text={I18n.t('haveAccount')}
                textStyle={Styles.linkText}
                onPress={() => this.context.reset('login')}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

RegisterScreen.contextTypes = {
  goTo: React.PropTypes.func,
  reset: React.PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.user !== null,
  // fetching: state.login.fetching,
  // noError: state.login.error === null,
});

const mapDispatchToProps = dispatch => ({
  attemptRegister: (username, password) =>
    dispatch(LoginActions.registerRequest(username, password)),
  facebookLogin: () => dispatch(LoginActions.oauthRequest('facebook'))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
