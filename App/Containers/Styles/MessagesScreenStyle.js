// @flow
import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  row: {
    flex: 1,
    backgroundColor: Colors.silver,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    borderColor: Colors.charcoal,
    borderBottomWidth: 0.65,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.wish,
    marginLeft: 5,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
  },
  msgText: {
    fontSize: 13,
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dateText: {
    textAlign: 'right',
    lineHeight: 18,
    fontSize: 12,
    color: Colors.charcoal,
    width: 45,
  },
  rowBack: {
    flex: 1,
  },
  backRightBtn: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    backgroundColor: Colors.fire,
    borderColor: Colors.charcoal,
    borderBottomWidth: 0.65,
  },
  backTextWhite: {
    color: Colors.snow,
    fontSize: Fonts.size.h4,
  }
});
