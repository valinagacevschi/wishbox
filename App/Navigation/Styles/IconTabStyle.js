import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Themes/';

export default StyleSheet.create({
  tabButton: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 6,
    borderTopColor: 'rgba(200,200,200,0.75)',
    borderTopWidth: Platform.OS === 'ios' ? 0 : 0.75,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.wish,
    shadowColor: Colors.wish,
  },
  icon: {
    flex: 1,
    backgroundColor: Colors.transparent,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  iconSelected: {
    color: Colors.wish,
    fontSize: 22,
  },
});
