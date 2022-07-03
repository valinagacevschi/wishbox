import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profile: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    paddingVertical: 15,
    paddingHorizontal: Metrics.baseMargin,
  },
  grid: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
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
  },
});
