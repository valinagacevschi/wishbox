import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  gridItem: {
    backgroundColor: Colors.snow,
    margin: 5,
    width: Metrics.screenWidth / 2 - 20,
    height: Metrics.screenWidth / 2 - 20,
    padding: 7.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
    borderRadius: 3,

    shadowColor: 'rgba(200,200,200, 0.95)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.95,
    shadowRadius: 3,
  },
  image: {
    width: Metrics.screenWidth / 2 - 30,
    height: Metrics.screenWidth / 2 - 110,
  },
  title: {
    paddingTop: Metrics.baseMargin,
    fontSize: 13,
  },
  price: {
    fontSize: 11,
    color: Colors.background,
  },
});
