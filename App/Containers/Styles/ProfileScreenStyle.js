import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: 130,
  },
  topBgr: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Metrics.screenWidth,
    height: 130,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 5,
  },
  camBarStyle: {
    alignSelf: 'center',
    width: 180,
    marginTop: -30,
  },
  form: {
    padding: 5,
  },
  card: {
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 5,
    marginTop: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.coal,
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(200,200,200,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  label: {
    marginRight: 5,
    fontSize: 13,
    color: Colors.charcoal,
    width: Metrics.screenWidth / 5,
  },
});
