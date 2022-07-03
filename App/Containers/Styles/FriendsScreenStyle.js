// @flow
import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  underline: {
    backgroundColor: Colors.wish,
    height: 3,
  },
  tabs: {
    borderColor: 'rgba(200,200,200,0.75)',
    height: 45,
    paddingTop: Metrics.baseMargin,
  },
  searchBar: {
    height: 36,
    backgroundColor: Colors.snow,
    borderColor: 'rgba(200,200,200,0.75)',
    borderWidth: 0.75,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 18,
  },
  listContent: {
    paddingBottom: 55,
  },
  button: {
    marginHorizontal: Metrics.baseMargin
  }
});
