import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  containers: {
    margin: 8,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 3,
    borderColor: 'rgba(200,200,200,0.75)',
    borderWidth: 0.75,
    borderRadius: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...Platform.select({
        ios: { height: 24 },
        android: { height: 44 },
    }),
    paddingTop: 5,
    width: Dimensions.get('window').width - 80,
    marginLeft: 5,
    fontSize: 16,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  navWrapper: {
    width: Dimensions.get('window').width,
  },
  nav: {
    flex: 1,
    flexBasis: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clear: {
    // marginLeft: -40,
    textAlign: 'center',
    width: 20,
    paddingVertical: 8,
    backgroundColor: Colors.transparent,
  },
});
