// Simple React Native specific changes
import Config from 'react-native-config';
import '../I18n/I18n';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: false,
  tutorial: {
    home: {
      text: 'Start adding items to your wishbox by tapping the "Add" button',
      top: 60,
      right: 10,
      up: true,
    },
    friends: {
      text: 'Connect with your friends by tapping the "Add friend" button',
      bottom: 60,
      right: 150,
      up: false,
    },
    addfriend: {
      text: 'Search for your friend. If he doesn’t have Wishbox already, you can invite him by e-mail',
      top: 60,
      right: 10,
      up: true,
    },
    boxitem: {
      text: 'This item can be reserved by you or by a group of people. If you want to split the cost, tap the “split” button and after that join the private chat',
      bottom: 25,
      right: 150,
      up: false,
    },
    mywishlist: {
      text: 'Add more wishboxes to keep your items organized.',
      bottom: 70,
      right: 150,
      up: false,
    },
    mywishbox: {
      text: 'Manage your wishbox privacy settings.',
      bottom: 55,
      right: 150,
      up: false,
    },
    addItem: {
      text: 'Select the desired item from the results or if you don’t see the one you want, you can search the web or add a custom one',
      top: 180,
      right: 10,
      up: true,
    },    
    addcustom: {
      text: 'First, add an image to your desired item. Then fill in the remainign details of your new item.',
      top: 210,
      right: 150,
      up: true,
    },
    addbox: {
      text: 'Pick a name for your wishbox and add a date if it\'s for a specific event. If the plans have changed, you can easily edit the wishbox date from here.',
      top: 160,
      right: 150,
      up: true,
    },
    access: {
      text: 'Search for friends or select from the list.',
      top: 110,
      right: 10,
      up: true,
    },
  }
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

window.fix = (image) => {
  if (!image) return `${image}`;
  image = image.replace('["','').replace('"]', '');
  if (image.startsWith('/')) {
    if (__DEV__ && false) {
      return `${Config.devBaseUrl}${encodeURI(image)}`;
    }
    return `${Config.baseUrl}${encodeURI(image)}`;
  }
  if (!image.startsWith('https://')) {
    return `${Config.weServUrl}/?url=${encodeURI(image).replace('http://', '')}`;
  }
  return image;
};

