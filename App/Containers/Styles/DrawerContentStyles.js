import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screem,
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: Platform.OS === 'ios' ? 20 : 40,
  },
  title: {
    color: Colors.wish,
    fontSize: Fonts.size.h4,
    alignSelf: 'center',
    paddingBottom: Metrics.baseMargin,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  // boxItem: {
  //   flexDirection: 'row',
  //   paddingVertical: Metrics.doubleBaseMargin,
  //   borderBottomWidth: 0.75,
  //   borderColor: 'rgba(20,20,20,0.3)',
  //   marginLeft: Metrics.doubleBaseMargin,
  // },
  // iconbox: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   backgroundColor: 'rgba(80,80,80,0.3)',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // lock: {
  //   position: 'absolute',
  //   right: 3,
  //   bottom: 3,
  // },
  // textbox: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingLeft: 15
  // },
  // text: {
  //   fontSize: 18,
  //   color: Colors.snow,
  // },
  simpleButton: {
    height: 90,
    padding: Metrics.baseMargin,
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin,
  },
  left: {
    marginRight: 5,
  },
  right: {
    marginLeft: 5
  }
});
