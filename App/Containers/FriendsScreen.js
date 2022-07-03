import React from 'react';
import { FlatList, SectionList, View, Alert } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import FriendsActions from '../Redux/FriendsRedux';
import FeedActions from '../Redux/FeedRedux';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Avatar from '../Components/Avatar';
import FriendsTab from '../Components/FriendsTab';
import ListSeparator from '../Components/ListSeparator';
import RoundedButton from '../Components/RoundedButton';
import Tutorial from '../Components/Tutorial';
// Styles
import styles from './Styles/FriendsScreenStyle';
import { Colors } from '../Themes';

class FriendsScreen extends React.PureComponent {
  static navigationOptions = () => ({
    tabBarIcon: props => <FriendsTab {...props} name="menu3" />,
  });

  constructor(props) {
    super(props);
    const { tab } = props.navigation.state.params || {};
    if (props.payload) {
      this.state = {
        tab,
        friends: props.payload.friends || [],
        connections: props.payload.connections || [],
        requests: [
          { data: props.payload.requests.requests, title: 'Received' },
          { data: props.payload.requests.sent, title: 'Sent' },
          { data: props.payload.requests.invites, title: 'Invited' },
        ],
      };
    } else {
      this.state = {
        tab,
        friends: [],
        connections: [],
        requests: [],
      };
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.loadFriends();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.payload) {
      this.setState({
        friends: newProps.payload.friends || [],
        connections: newProps.payload.connections || [],
        requests: [
          { data: newProps.payload.requests.requests, title: 'Received' },
          { data: newProps.payload.requests.sent, title: 'Sent' },
          { data: newProps.payload.requests.invites, title: 'Invited' },
        ],
      });
    }
  }

  onPressAccept = data => {
    this.props.accept(data.id);
    this.props.loadCounters();
  };

  onPressRefuse = data => {
    Alert.alert(I18n.t('refuse'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK', 
        onPress: () => {
          this.props.refuse(data.id); 
          this.props.loadCounters();
        } 
      }
    ]);
  };

  onPressUnfriend = data => {
    Alert.alert(I18n.t('unfriend'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.props.unfriend(data.id) }
    ]);
  };

  onPressCancel = data => {
    const { id, uid, type } = data;
    Alert.alert(I18n.t('cancelInvite'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.props.cancel(uid || id, type) }
    ]);
  };

  onPressRefresh = data => {
    Alert.alert(I18n.t('resendInvite'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.props.resend(data.id) }
    ]);
  };

  onPressOwner = data => {
    this.context.goTo('wishlist', { user: data });
  };

  onPressRight = () => {
    this.context.goTo('addFriend', {
      connections: this.props.payload ? this.props.payload.connections : []
    });
  };

  renderTab = () => (
    <DefaultTabBar
      activeTextColor={Colors.wish}
      underlineStyle={styles.underline}
      textStyle={styles.textStyle}
      style={styles.tabs}
    />
  );

  renderItem = ({ item, section }) => (
    <Avatar
      section={section ? section.title : 'friend'}
      user={item}
      onPressRefuse={() => this.onPressRefuse(item)}
      onPressAccept={() => this.onPressAccept(item)}
      onPressUnfriend={() => this.onPressUnfriend(item)}
      onPressCancel={() => this.onPressCancel(item)}
      onPressOwner={() => this.onPressOwner(item)}
      onPressRefresh={() => this.onPressRefresh(item)}
    />
  );

  render() {
    const page = this.state.tab ? 1 : (this.props.counters.requests > 0 ? 1 : 0);
    return (
      <View style={styles.mainContainer}>
        <Header
          title={I18n.t('friends')}
          leftIcon={'wishbox-logo'}
          leftIconColor={Colors.wish}
          // rightIcon={'add-friend'}
          // rightIconPress={this.onPressRight}
        />
        <ScrollableTabView
          style={{ marginTop: 0 }}
          initialPage={page}
          renderTabBar={this.renderTab}
        >
          <View style={{ flex: 1 }} tabLabel={I18n.t('connections')}>
            <SearchBar
              showOnLoad
              autoCorrect={false}
              ref={ref => (this.searchBar = ref)}
              data={this.props.payload ? this.props.payload.friends : []}
              handleResults={friends => this.setState({ friends })}
            />
            <FlatList
              keyExtractor={(item, index) => index}
              onRefresh={() => this.props.loadFriends()}
              refreshing={this.props.refreshing}              
              contentContainerStyle={styles.listContent}
              data={this.state.friends}
              renderItem={this.renderItem}
            />
            <View>
              <RoundedButton
                text={'Add friends'}
                style={styles.button}
                onPress={this.onPressRight}
              />
            </View>
          </View>
          <View style={{ flex: 1 }} tabLabel={I18n.t('requests')}>
            <SectionList
              keyExtractor={(item, index) => index}
              onRefresh={() => this.props.loadFriends()}
              refreshing={this.props.refreshing}
              contentContainerStyle={styles.listContent}
              renderItem={this.renderItem}
              renderSectionHeader={({ section }) => <ListSeparator text={section.title} count={section.data.length} />}
              sections={this.state.requests}
            />
          </View>
        </ScrollableTabView>

        <Tutorial route='friends' />
      </View>
    );
  }
}

FriendsScreen.contextTypes = {
  goTo: React.PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.user !== null,
  payload: state.friends.payload,
  refreshing: !!state.friends.fetching,
  counters: state.feed.counters,
});

const mapDispatchToProps = dispatch => ({
  loadFriends: () => dispatch(FriendsActions.friendsRequest()),
  accept: id => dispatch(FriendsActions.friendsAccept(id)),
  refuse: id => dispatch(FriendsActions.friendsRefuse(id)),
  unfriend: id => dispatch(FriendsActions.friendsUnfriend(id)),
  cancel: (id, cat) => dispatch(FriendsActions.friendsCancel(id, cat)),
  resend: id => dispatch(FriendsActions.friendsResend(id)),
  loadCounters: () => dispatch(FeedActions.countersRequest()),
});

const areStatesEqual = (prev, next) => (
  prev.friends.payload
  && next.friends.payload
  && _.isEqual(prev.friends.payload.friends, next.friends.payload.friends)
  && _.isEqual(prev.friends.payload.connections, next.friends.payload.connections)
  && _.isEqual(prev.friends.payload.requests, next.friends.payload.requests)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(FriendsScreen);
