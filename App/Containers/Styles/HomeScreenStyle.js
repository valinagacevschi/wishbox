// @flow
import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  label: { fontSize: 18, margin: 10 },
  modalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,0.3)'
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
});
