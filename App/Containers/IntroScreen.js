import React from 'react';
import { View, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import AppIntro from 'react-native-app-intro';
import SplashScreen from 'react-native-splash-screen';
// import I18n from 'react-native-i18n';
import LoginActions from '../Redux/LoginRedux';
// import AppIntro from '../Components/AppIntro';
// Styles
import styles from './Styles/IntroScreenStyle';
import { Images, Colors } from '../Themes';

class IntroScreen extends React.Component {

  componentDidMount() {
    if (Platform.OS === 'android') SplashScreen.hide();
  }

  doneBtnHandle = () => {
    if (this.props.firstTime) {
      this.props.dismiss();
    }
    this.context.goBack();
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f0f0f0' }} >
        <Image resizeMode='contain' source={Images.wizard3} style={styles.bgr} />
        <AppIntro
          dotColor={Colors.wish}
          activeDotColor={Colors.background}
          rightTextColor={Colors.background}
          leftTextColor={Colors.background}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.doneBtnHandle}
        > 
          <View style={styles.slide}>
            <View style={{ flex: 1 }}>
              <Image source={Images.step1} resizeMode='contain' style={styles.innerImage} />
            </View>
          </View>
          <View style={styles.slide}>
            <View style={{ flex: 1 }}>
              <Image source={Images.step2} resizeMode='contain' style={styles.innerImage} />
            </View>
          </View>
          <View style={styles.slide}>
            <View style={{ flex: 1 }}>
              <Image source={Images.step3} resizeMode='contain' style={styles.innerImage} />
            </View>
          </View>
          <View style={styles.slide}>
            <View style={{ flex: 1 }}>
              <Image source={Images.step4} resizeMode='contain' style={styles.innerImage} />
            </View>
          </View>
        </AppIntro>
      </View>
    );
  }
}

IntroScreen.contextTypes = {
  goBack: React.PropTypes.func,
};

const mapStateToProps = (state) => ({ firstTime: state.login.firstTime });
const mapDispatchToProps = (dispatch) => ({ dismiss: () => dispatch(LoginActions.firstTime()) });

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
