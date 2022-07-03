import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.75,
    shadowColor: Colors.steel,
    shadowRadius: 3,
    borderRadius: 3,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: Metrics.baseMargin,
    paddingBottom: 35,
  },
  boxName: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 30,
    fontSize: Fonts.size.small,
  },
  hr: {
    flex: 1,
    borderColor: Colors.steel,
    borderBottomWidth: 0.65,
    height: Metrics.baseMargin,
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
  },
  boxImage: {
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    zIndex: 9,
    backgroundColor: Colors.transparent,
  },
  boxPic: {
    flex: 1,
    height: 45,
    width: 45,
    borderRadius: 22,
  },
  boxDate: {
    flex: 1,
    textAlign: 'right',
    fontSize: Fonts.size.small,
    color: Colors.charcoal,
  },
  prodBox: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    borderBottomWidth: 0.65,
    borderColor: Colors.steel,
  },
  prodImage: {
    flex: 1,
    height: 200,
    marginHorizontal: -Metrics.baseMargin,
  },
  lineText: {
    fontSize: Fonts.size.small,
    padding: Metrics.baseMargin,
  },
  lineIcon: {
    justifyContent: 'center',
    marginRight: Metrics.baseMargin,
  },
});
