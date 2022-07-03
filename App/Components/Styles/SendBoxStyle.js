import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  sendBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: Colors.title,
    borderBottomWidth: 0.75,
    fontSize: 16,
    ...Platform.select({
      android: { paddingBottom: 5, marginBottom: 10 }
    })
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,

  }
});
