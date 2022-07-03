import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import LoginActions from '../Redux/LoginRedux';
import StartupActions from '../Redux/StartupRedux';
import Header from '../Components/Header';
import RoundedButton from '../Components/RoundedButton';
import { Colors, Icons } from '../Themes';

// Styles
import styles from './Styles/MoreScreenStyle';

class MoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.dataObjects = [
    { name: 'To Get', icon: 'to-get', color: Colors.shop, bgColor: Colors.shopB, key: 'toGet' },
    { name: 'Events', icon: 'events', color: Colors.events, bgColor: Colors.eventsB, key: 'events' },
    { name: 'Profile', icon: 'profile', color: Colors.profile, bgColor: Colors.profileB, key: 'profile' },
    { name: 'Help', icon: 'help', color: Colors.help, bgColor: Colors.helpB, key: 'help' },
    ];
  }

  componentDidMount() { }

  onPressLogout = () => {
    Alert.alert('Logout', 'are you sure?', [
      { text: 'No' },
      { text: 'Yes', onPress: () => {
        this.props.logout();
        this.context.reset('login');
        // this.props.startup();
      } },
    ]);
  };

  onPressItem = (key) => {
    this.context.goTo(key);
  }

  onPressTerms = () => {
    this.context.goTo('web', { title: I18n.t('terms'), uri: 'https://example.com/wb-terms.html' });
  }

  renderBox(boxData, i) {
    const { name, icon, color, bgColor, key } = boxData;
    return (
      <TouchableOpacity key={i} onPress={() => this.onPressItem(key)}>
        <View style={styles.gridItem}>
          <View style={[styles.iconbox, { backgroundColor: bgColor }]}>
            <Icons
              name={icon}
              size={36}
              color={color}
            />
          </View>
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={I18n.t('more')}
          leftIcon={'wishbox-logo'}
          leftIconColor={Colors.wish}
        />
        <ScrollView contentContainerStyle={styles.grid}>
          {this.dataObjects.map((box, i) => this.renderBox(box, i))}
        </ScrollView>
        <View style={{ height: 55, padding: 5 }}>
          <RoundedButton text={I18n.t('terms')} ok style={{ marginHorizontal: 10 }} onPress={this.onPressTerms} />
        </View>
        <View style={{ height: 55, padding: 5 }}>
          <RoundedButton text={I18n.t('logOut')} cancel style={{ marginHorizontal: 10 }} onPress={this.onPressLogout} />
        </View>
      </View>
    );
  }
}

MoreScreen.contextTypes = {
  goTo: React.PropTypes.func,
  reset: React.PropTypes.func,
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(LoginActions.logout()),
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen);
