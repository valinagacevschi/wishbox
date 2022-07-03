import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: -Metrics.baseMargin,
  },
  large: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: -20,
  },
  count: {
    backgroundColor: Colors.wish,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: Colors.snow,
  },
  labelText: {
    color: Colors.charcoal
  },
});
