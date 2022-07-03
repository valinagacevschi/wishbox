import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  kbView: {
    flex: 1,
    backgroundColor: Colors.snow,
    // backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: 150,
    // marginBottom: Metrics.baseMargin,
  },
  topBgr: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Metrics.screenWidth,
    height: 150,
  },
  gallery: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    paddingTop: 5,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  progress: {
    position: 'absolute',
    backgroundColor: Colors.transparent,
    color: Colors.snow,
    top: 35,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
  },
  addItem: {
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
  }
});
