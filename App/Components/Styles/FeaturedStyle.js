import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Metrics.baseMargin,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowColor: 'rgba(200,200,200,0.4)',
    shadowRadius: 3,
    borderRadius: 3,
  },
  image: {
    width: 150,
    height: 120,
  },
  label: {
    width: 150,
    textAlign: 'center',
    color: Colors.charcoal,
    paddingVertical: 5,
    paddingHorizontal: Metrics.baseMargin,
  }
});
