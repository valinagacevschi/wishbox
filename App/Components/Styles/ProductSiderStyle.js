import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
  },
  wrapper: {
  },
  slide: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
  },
  priceTag: {
    backgroundColor: Colors.azure,
    position: 'absolute',
    left: 0,
    top: Metrics.doubleBaseMargin,
    paddingVertical: 5,
    paddingHorizontal: Metrics.baseMargin,
  },
  price: {
    ...Fonts.style.small,
    color: Colors.snow,
  },
});
