import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
    marginHorizontal: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    shadowColor: 'rgba(100,100,100,0.5)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    paddingHorizontal: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    borderColor: 'rgba(200,200,200,0.75)',
    borderBottomWidth: 0.75,
  },
  title: {
    color: Colors.title,
  }
});
