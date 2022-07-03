import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  barLikes: {
    paddingTop: Metrics.baseMargin,
    flexDirection: 'row',
    marginBottom: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    // marginVertical: Metrics.doubleBaseMargin,
    // borderColor: Colors.title,
    // borderTopWidth: 0.55,
  },
  segmentLikes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Fonts.size.small,
    color: Colors.charcoal,
  }
});
