import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  boxItem: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
  },
  iconbox: {
    backgroundColor: Colors.wish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
  },
  text: {
    fontSize: 14,
    color: Colors.snow,
    backgroundColor: Colors.transparent,
  },
});
