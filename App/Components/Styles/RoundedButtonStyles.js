import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 28,
    // marginHorizontal: Metrics.section,
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.wish,
    borderColor: Colors.wish,
    borderWidth: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.normal,
    marginVertical: Metrics.baseMargin
  },
  buttonCancel: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.fire,
  },
  buttonOk: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.wish,
  },
  textCancel: {
    color: Colors.fire,
  },
  textOk: {
    color: Colors.wish,
  },
});
