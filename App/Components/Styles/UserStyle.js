import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  user: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    resizeMode: 'cover',
    marginRight: 7.5,
  },
  nameBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
  },
  rightLabel: {
    fontSize: 12,
    color: Colors.title,
  },
  id: {
    color: Colors.steel,
    fontSize: 10,
    paddingRight: 10,
  }
});
