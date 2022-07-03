import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    marginHorizontal: 30,
    backgroundColor: Colors.snow,
    minWidth: 270,
    alignItems: 'center',
  },
  inputBox: {
    alignSelf: 'stretch',
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  sae: {
    borderBottomColor: Colors.coal,
    borderBottomWidth: 0.55,
  },
  inputStyle: {
    color: Colors.coal,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5
  },
  button: {
    flex: 1,
    margin: 5,
  },
  // text: {
  //   color: 'black',
  //   fontSize: 24
  // }
});
