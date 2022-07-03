import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    fontSize: 18,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderTopWidth: 0.6,
    borderColor: Colors.steel,
  },
  sendBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderColor: Colors.steel,
    borderBottomWidth: 0.7,
  },
  textInput: {
    flex: 1,
    borderColor: Colors.title,
    borderBottomWidth: 0.75,
    fontSize: 16,
  },
  grid: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin,
  },
  friend: {
    paddingVertical: Metrics.baseMargin,
    borderColor: Colors.steel,
    borderBottomWidth: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
