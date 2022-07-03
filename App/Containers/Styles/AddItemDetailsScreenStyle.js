import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  kbView: {
    flex: 1,
    backgroundColor: '#fff',
    // marginBottom: 53,
  },
  addItem: {
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
  },
  indicator: {
    position: 'absolute',
    height: 50,
    top: Metrics.screenHeight / 2 - 100,
    left: Metrics.screenWidth / 2,
  }
});
