import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: Metrics.titlePadding
  // },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: 'rgba(200,200,200,0.7)',
    paddingVertical: 5,
    borderBottomWidth: 0.8,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },
  unFriend: {
    borderColor: Colors.fire,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 5,
  },
  unText: {
    color: Colors.fire,
    fontSize: 11,
  },
  invite: {
    backgroundColor: Colors.wish,
    borderColor: Colors.wish,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  inText: {
    color: Colors.snow,
    fontSize: 11,
  },
});
