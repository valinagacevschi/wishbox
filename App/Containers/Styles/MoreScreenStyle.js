// @flow
import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  grid: {
    marginVertical: Metrics.baseMargin,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // flex: 1,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  gridItem: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    width: 140,
    height: 140,

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
  iconbox: {
    marginTop: 15,
    width: 75,
    height: 75,
    borderRadius: 40,
    opacity: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: Metrics.baseMargin,
    fontSize: 18,
  },
});
