import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? Metrics.navBarHeight : Metrics.navBarHeight - 10,
    marginTop: 0, //Platform.OS === 'ios' || Platform.Version < 19 ? 0 : 24,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? Metrics.baseMargin : 0,
    shadowColor: Colors.coal,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    // borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.35,
    // borderBottomColor: Colors.coal,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    width: Metrics.headerWidth,
    ...Fonts.style.h5,
    color: Colors.snow,
  },
  btn: {
    backgroundColor: Colors.wish,
    borderRadius: 20,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 4,
    marginRight: 5,
  },
  btnText: {
    paddingHorizontal: 5,
    color: Colors.snow,
  },
  bullet: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.fire,
    borderRadius: 11,
    marginTop: 6,
    marginLeft: 15,
  },
  bulletText: {
    color: Colors.snow,
    fontSize: 12,
  },
  // button: {
  //   paddingVertical: 10,
  //   paddingLeft: 10,
  //   paddingRight: 3,
  // },
  noRight: {
    flex: 1,
    marginLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
