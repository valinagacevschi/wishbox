import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.title,
    borderBottomWidth: 0.95,
    marginVertical: Metrics.baseMargin,
  },
  inputStyle: {
    fontSize: 14.5,
    fontWeight: 'normal',
    height: 28,
    paddingVertical: Platform.OS === 'ios' ? 'auto' : 0,
  },
  labelStyle: {
    fontSize: 13,
    color: Colors.title,
  },
  error: {
    color: Colors.fire,
  }
});
