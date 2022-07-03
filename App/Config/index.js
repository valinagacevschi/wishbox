import { Text } from 'react-native';
import DebugConfig from './DebugConfig';
import AppConfig from './AppConfig';

export default () => {
  if (__DEV__) {
    // If ReactNative's yellow box warnings are too much, it is possible to turn
    // it off, but the healthier approach is to fix the warnings.  =)
    console.disableYellowBox = !DebugConfig.yellowBox;
  }
};
// Allow/disallow font-scaling in app
console.disableYellowBox = true;
Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling;
export const tutorial = AppConfig.tutorial;

export const routeTo = (path, props, goTo) => {
  if (props) {
    props.loadCounters();
    props.getNotes();
  }
  if (path.startsWith('myBoxItem')) {
    props && props.loadFeed();
    const boxItemId = parseInt(path.split('/')[1]);
    goTo('myboxitem', { boxItemId });
  } else if (path.startsWith('boxItem')) {
    props && props.loadFeed();
    const boxItemId = parseInt(path.split('/')[1]);
    goTo('boxitem', { boxItemId });
  } else if (path.startsWith('box')) {
    const boxId = parseInt(path.split('/')[1]);
    goTo('wishbox', { boxId });
  } else if (path.startsWith('friends')) {
    props && props.loadFriends();
    goTo('friends', { refresh: true });
  } else if (path.startsWith('requests')) {
    props && props.loadFriends();
    goTo('friends', { tab: 'requests', refresh: true });
  }
};
