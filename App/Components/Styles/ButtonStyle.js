import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    paddingVertical: Metrics.baseMargin,
  },
  label: {
    paddingLeft: 5,
  }
})
