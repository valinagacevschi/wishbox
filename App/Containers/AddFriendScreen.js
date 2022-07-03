import React from 'react';
import { FlatList, View, Alert } from 'react-native';
import I18n from 'react-native-i18n';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import FriendsActions from '../Redux/FriendsRedux';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Avatar from '../Components/Avatar';
import ModalPopup from '../Components/ModalPopup';
import RoundedButton from '../Components/RoundedButton';
import Tutorial from '../Components/Tutorial';
// Styles
import styles from './Styles/AddFriendScreenStyle';
import { Colors, Icons } from '../Themes';

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: [...props.navigation.state.params.connections.asMutable({ deep: true })],
      email: null,
      invited: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps) {
      if (newProps.results && newProps.results.length > 0) {
        let connections = [...newProps.results.asMutable({ deep: true })];
        if (this.state.invited) {
          connections = connections.filter(user => user.uid !== this.state.invited);
        }
        this.setState({ connections });
      } else if (newProps.payload) {
        this.setState({ connections: [...newProps.payload.connections.asMutable({ deep: true })] });
      }
    }
  }

  onSubmit = () => {
    if (this.state.email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
        this.props.sendInvite(this.state.email);
        this.setState({ email: null });
        this.refs.modal.close();
      } else {
        Alert.alert('Alert', 'Incorrect email address. Please enter a correct email address.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
      }
    }
  };

  onPressInvite = (data) => {
    this.setState({ invited: data.uid }, () => this.props.invite(data.uid));
  };

  handleSearch = input => {
    if (input.length > 2) {
      this.props.searchFriends(input);
    } else {
      this.setState({ connections: [] });
    }
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };

  renderItem = ({ item, index }) => (
    <Avatar
      section="unknown"
      user={item}
      onPressInvite={() => this.onPressInvite(item, index)}
      onPressOwner={() => this.onPressInvite(item, index)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('addFriend')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
          rightIcon={'email-search-modal'}
          rightIconSize={18}
          rightIconPress={() => this.refs.modal.open()}
        />
        <SearchBar
          showOnLoad
          autoFocus
          autoCorrect={false}
          ref={ref => (this.searchBar = ref)}
          handleSearch={this.handleSearch}
        />
        <FlatList
          style={{ marginBottom: 0 }}
          refreshing={this.props.refreshing}
          onRefresh={() => this.props.loadFriends()}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) => index}
          data={this.state.connections}
          renderItem={this.renderItem}
        />
        <ModalPopup ref="modal">
          <View style={styles.modalBox}>
            <View style={styles.dialog}>
              <Icons
                name="email-search-modal"
                color={Colors.steel}
                size={48}
                style={{ marginTop: 25 }}
              />
              <View style={styles.inputBox}>
                <Sae
                  placeholder="Type email address"
                  style={styles.sae}
                  inputStyle={styles.inputStyle}
                  iconClass={FontAwesomeIcon}
                  iconColor={Colors.coal}
                  iconName={'envelope'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.email}
                  keyboardType="email-address"
                  underlineColorAndroid={Colors.transparent}
                  returnKeyType="go"
                  onChangeText={this.handleChangeEmail}
                  onSubmitEditing={this.onSubmit}
                />
              </View>
              <View style={styles.buttonRow}>
                <RoundedButton cancel style={styles.button} onPress={() => this.refs.modal.close()}>
                  {I18n.t('cancel')}
                </RoundedButton>
                <RoundedButton style={styles.button} onPress={this.onSubmit}>
                  {I18n.t('add')}
                </RoundedButton>
              </View>
            </View>
          </View>
        </ModalPopup>
        <Tutorial route='addfriend' />
      </View>
    );
  }
}

AddFriend.contextTypes = {
  goBack: React.PropTypes.func
};

const mapStateToProps = state => ({
  payload: state.friends.payload,
  results: state.friends.results,
  refreshing: !!state.friends.fetching
});

const mapDispatchToProps = dispatch => ({
  loadFriends: () => dispatch(FriendsActions.friendsRequest()),
  searchFriends: searchTerm => dispatch(FriendsActions.friendsSearch(searchTerm)),
  invite: id => dispatch(FriendsActions.friendsInvite(id)),
  sendInvite: email => dispatch(FriendsActions.sendInvite(email))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.friends.payload, next.friends.payload)
  && _.isEqual(prev.friends.results, next.friends.results)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(AddFriend);
