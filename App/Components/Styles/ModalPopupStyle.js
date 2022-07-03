import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundT,
  },
  innerModal: {
    flex: 1,
    width: Metrics.screenWidth,
  },
  iconStyle: {
    marginRight: 0,
  },
});
