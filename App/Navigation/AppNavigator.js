import React from 'react';
import { Dimensions, Platform } from 'react-native';

import { 
  TabNavigator, 
  StackNavigator, 
  NavigationActions
 } from 'react-navigation';
import HomeScreen from '../Containers/HomeScreen';
import FriendsScreen from '../Containers/FriendsScreen';
import AddFriendScreen from '../Containers/AddFriendScreen';
import MessagesScreen from '../Containers/MessagesScreen';
import MyWishBoxScreen from '../Containers/MyWishBoxScreen';
import WishBoxScreen from '../Containers/WishBoxScreen';
import SuggestScreen from '../Containers/SuggestScreen';
import BoxItemScreen from '../Containers/BoxItemScreen';
import ChatScreen from '../Containers/ChatScreen';
import ChatInfoScreen from '../Containers/ChatInfoScreen';
import ContributorsScreen from '../Containers/ContributorsScreen';
import SearchScreen from '../Containers/SearchScreen';
import AddItemDetailsScreen from '../Containers/AddItemDetailsScreen';
import AddCustomItemScreen from '../Containers/AddCustomItemScreen';
import MoreScreen from '../Containers/MoreScreen';
import AccessScreen from '../Containers/AccessScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import ToGetScreen from '../Containers/ToGetScreen';
import HelpScreen from '../Containers/HelpScreen';
import IntroScreen from '../Containers/IntroScreen';
import LoginScreen from '../Containers/LoginScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import RecoverScreen from '../Containers/RecoverScreen';
import EventsScreen from '../Containers/EventsScreen';
import NewItemScreen from '../Containers/NewItemScreen';
import PhotoScreen from '../Containers/PhotoScreen';
import WebImagesScreen from '../Containers/WebImagesScreen';
import SearchWebScreen from '../Containers/SearchWebScreen';

import WishboxListScreen from '../Containers/WishboxListScreen';
import MyWishboxListScreen from '../Containers/MyWishboxListScreen';
import AddBoxScreen from '../Containers/AddBoxScreen';
import WebScreen from '../Containers/WebScreen';
// import TutorialScreen from '../Containers/TutorialScreen';

import IconTab from '../Navigation/IconTab';
import { Metrics, Colors } from '../Themes';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

const HomeNavigator = StackNavigator(
  {
    home: { screen: HomeScreen },
    search: { screen: SearchScreen },
    wishlist: { screen: WishboxListScreen },
    wishbox: { screen: WishBoxScreen },
    boxitem: { screen: BoxItemScreen },
    myboxitem: { screen: BoxItemScreen },
    chat: { screen: ChatScreen },
    chatinfo: { screen: ChatInfoScreen },
    contrib: { screen: ContributorsScreen },
    additem: { screen: AddItemDetailsScreen },
    addcustom: { screen: AddCustomItemScreen },
    webImage: { screen: WebImagesScreen },
    searchweb: { screen: SearchWebScreen },
    newitem: { screen: NewItemScreen },
    suggest: { screen: SuggestScreen },
    web: { screen: WebScreen },
  },
  {
    headerMode: 'none',
    // mode: 'modal',
    navigationOptions: {
      tabBarIcon: props => <IconTab name="menu1" {...props} />
    }
  }
);

const MyWishBoxNavigator = StackNavigator(
  {
    mywishlist: { screen: MyWishboxListScreen },
    mywishbox: { screen: MyWishBoxScreen },
    addbox: { screen: AddBoxScreen },
    myboxitem: { screen: BoxItemScreen },
    chat: { screen: ChatScreen },
    chatinfo: { screen: ChatInfoScreen },
    contrib: { screen: ContributorsScreen },    
    access: { screen: AccessScreen },
    search: { screen: SearchScreen },
    additem: { screen: AddItemDetailsScreen },
    addcustom: { screen: AddCustomItemScreen },
    webImage: { screen: WebImagesScreen },
    searchweb: { screen: SearchWebScreen },
    newitem: { screen: NewItemScreen },
    web: { screen: WebScreen },    
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name="menu2" {...props} />
    }
  }
);

const FriendsNavigator = StackNavigator(
  {
    friends: { screen: FriendsScreen },
    addFriend: { screen: AddFriendScreen },
    wishlist: { screen: WishboxListScreen },
    wishbox: { screen: WishBoxScreen },
    boxitem: { screen: BoxItemScreen },
    chat: { screen: ChatScreen },
    chatinfo: { screen: ChatInfoScreen },
    contrib: { screen: ContributorsScreen },    
    web: { screen: WebScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name="menu3" {...props} />
    }
  }
);

const MoreNavigator = StackNavigator(
  {
    morex: { screen: MoreScreen },
    toGet: { screen: ToGetScreen },
    boxitem: { screen: BoxItemScreen },
    events: { screen: EventsScreen },
    profile: { screen: ProfileScreen },
    chat: { screen: ChatScreen },
    chatinfo: { screen: ChatInfoScreen },
    contrib: { screen: ContributorsScreen },
    help: { screen: HelpScreen },
    wishbox: { screen: WishBoxScreen },
    web: { screen: WebScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      tabBarIcon: props => <IconTab name="menu5" {...props} />
    }
  }
);

const MessagesNavigator = StackNavigator(
  {
    messages: { screen: MessagesScreen },
    myboxitem: { screen: BoxItemScreen },
    boxitem: { screen: BoxItemScreen },
    wishbox: { screen: WishBoxScreen },
    wishlist: { screen: WishboxListScreen },
    web: { screen: WebScreen },
    chat: { screen: ChatScreen },
    chatinfo: { screen: ChatInfoScreen },    
    contrib: { screen: ContributorsScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name="menu4" {...props} />
    }
  }
);

// const currentIndex = -1;
const MainScreenNavigator = TabNavigator(
  {
    home: { screen: HomeNavigator },
    mywishlist: { screen: MyWishBoxNavigator },
    friends: { screen: FriendsNavigator },
    messages: { screen: MessagesNavigator },
    more: { screen: MoreNavigator },
  },
  {
    initialRouteName: 'home',
    tabBarPosition: 'bottom',
    lazy: true,
    backBehavior: 'none',
    headerMode: 'none',
    scrollEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      scrollEnabled: false,
      activeBackgroundColor: Colors.snow,
      inactiveTintColor: Colors.snow,
      showLabel: false,
      showIcon: true,
      upperCaseLabel: false,
      tabStyle: {
        backgroundColor: Colors.snow,
        height: Metrics.tabBarHeight,
        ...Platform.select({ android: { padding: 0 } })
      },
      iconStyle: {
        width: screenWidth / 5.1,
        height: 48
      },
      style: {
        backgroundColor: Colors.snow,
        shadowColor: 'rgba(100,100,100, 1)',
        shadowOffset: { height: -2, width: 0 },
        shadowOpacity: 0.2
      }
    },
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
        const { route, focused, index } = scene;
        if (!focused) {  
          if (route.index > 0) {
            const tabRoute = route.routeName;
            const { routeName, key } = route.routes[0];
            navigation.dispatch(
              NavigationActions.navigate({ routeName: tabRoute })
            );
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                key,
                actions: [
                  NavigationActions.navigate({ routeName }) 
                ]
              })
            );
          } else {
            jumpToIndex(index);
          }
        }
      },
    }
  )
});

const AppNavigator = StackNavigator({
    // intro: { screen: IntroScreen },
    main: { screen: MainScreenNavigator },
    login: { screen: LoginScreen },
    recover: { screen: RecoverScreen },
    register: { screen: RegisterScreen },
    photo: { screen: PhotoScreen },
    intro: { screen: IntroScreen },
    // tutorial: { screen: TutorialScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    cardStyle: { backgroundColor: 'rgba(0,0,0,0)', },
    navigationOptions: {},
    transitionConfig: () => ({ screenInterpolator: forVertical })
  }
);

const forVertical = (props) => {
  const { layout, position, scene } = props;
  const index = scene.index;
  const hght = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]),
    outputRange: ([hght, 0, 0])
  });

  return {
    transform: [{ translateX }, { translateY }]
  };
};

export default AppNavigator;
