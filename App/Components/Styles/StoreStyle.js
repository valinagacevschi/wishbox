import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  image: {
    marginRight: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    width: 50,
    height: 50,
  },  
  textBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: Colors.background
  }  
});
