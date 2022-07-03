import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200,200,200,1)',
    height: 26,
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingLeft: 5,
    paddingTop: 1,
    fontSize: 13,
    color: '#666',
  },
  bubble: {
    backgroundColor: '#fff',
    width: 18,
    height: 18,
    borderRadius: 9,
    paddingTop: 3,
    alignItems: 'center',
  },
  btext: {
    // backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 9,
    padding: 0,
  }
});
