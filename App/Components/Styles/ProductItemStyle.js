import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    borderColor: Colors.steel,
    borderBottomWidth: 0.55,
  },
  imageBox: {
    backgroundColor: Colors.snow,
    shadowColor: 'rgba(150,150,150,0.5)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.75,
    marginRight: Metrics.baseMargin,
  },
  image: {
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  name: { },
  store: {
    color: Colors.charcoal,
    fontSize: 12,
  },
  price: {
    color: '#777',
    fontSize: 13,
  },
  icon: {
    marginRight: 0,
    width: 12,
    height: 12,
    textAlign: 'center',
  },
});
