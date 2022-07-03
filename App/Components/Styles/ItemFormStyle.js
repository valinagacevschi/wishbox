import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  form: {
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.snow,
  },
  row: {
    paddingTop: 5,
  },
  label: {
    paddingLeft: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    fontSize: 11.5,
    color: Colors.title,
  },
  curr: {
    fontSize: 13.5,
  }
});
