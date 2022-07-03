import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  extraBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  chatBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinBtn: {
    borderColor: Colors.wish,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    // width: 100,
    alignItems: 'center',
  },
  joinText: {
    color: Colors.wish,
    fontSize: 11,
  },
});
