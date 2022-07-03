import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topBgr: {
    flex: 1,
    position: 'absolute',
    top: -1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  logoSearch: {
    // flex: 1,
    marginTop: 50,
    marginBottom: 20,
    width: 60,
    height: 60,
  },
  itemText: {
    backgroundColor: Colors.transparent,
    fontSize: 24,
    color: Colors.wish,
    textAlign: 'center',
    paddingBottom: Metrics.doubleBaseMargin,
  },
  list: {
    marginHorizontal: Metrics.baseMargin,
  }
});
