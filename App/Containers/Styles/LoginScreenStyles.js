import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topBgr: {
    position: 'absolute',
    top: 0
  },
  decoration: {
    position: 'absolute',
    top: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  container: {
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2.3,
    marginTop: 40,
  },
  form: {
    margin: Metrics.baseMargin,
    // backgroundColor: Colors.coal,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin - 25,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  inputStyle: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.75,
  },
  labelStyle: {
    color: Colors.snow,
    marginBottom: 3,
    fontWeight: 'normal'
  },
  loginRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  facebook: {
    backgroundColor: Colors.facebook,
    alignSelf: 'stretch',
    justifyContent: 'center',
    //marginHorizontal: Metrics.section,
    //marginVertical: Metrics.doubleBaseMargin,
    height: 45,
    borderRadius: 40,
  },
  fbText: {
    fontSize: Fonts.size.normal,
    color: Colors.snow,
  },
  link: {
    borderBottomWidth: 0,
    marginTop: 20
  },
  linkText: {
    color: Colors.wish,
    fontWeight: 'bold'
  },
  bottomLink: {
    position: 'absolute',
    bottom: 10
  },
});
