// @flow
import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
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
  eventDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    paddingHorizontal: 5,
  },
});
