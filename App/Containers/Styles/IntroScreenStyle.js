import { ApplicationStyles, Metrics } from '../../Themes/';

export default {
  ...ApplicationStyles.screen,
  slide: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    // backgroundColor: 'rgba(255,255,255,1)',
  },
  bgr: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
  },
  innerImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 70,
  }  
};
