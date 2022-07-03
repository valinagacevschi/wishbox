import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-start',
    width: Metrics.screenWidth - 20,
    flexDirection: 'column',
  },

  square: {
    backgroundColor: Colors.snow,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.coal,
    shadowOpacity: 0.5,
    shadowRadius: 4.5,
    elevation: 5,
  },

  triangle: {
    backgroundColor: 'transparent',
    width: Metrics.baseMargin,
    height: Metrics.baseMargin,

    alignSelf: 'flex-end',
    marginHorizontal: Metrics.smallMargin,

    borderStyle: 'solid',

    borderWidth: Metrics.smallMargin,
    borderColor: 'transparent',

    borderBottomColor: '#805BA4', //Colors.snow,
    borderBottomWidth: Metrics.smallMargin,

    // borderLeftWidth: Metrics.baseMargin,
    // borderRightWidth: Metrics.baseMargin,
  },

  triangleDown: {
    transform: [
      { rotate: '180deg' }
    ]
  },

});
