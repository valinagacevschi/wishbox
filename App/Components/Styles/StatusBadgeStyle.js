import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
    marginVertical: 10,
    justifyContent: 'center',
  },
  icon: {
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  status: {
    fontSize: 9,
    color: '#fff',
  },
});
