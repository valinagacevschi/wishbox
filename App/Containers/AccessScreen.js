import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Header from '../Components/Header';
import User from '../Components/User';
import OnlineLabel from '../Components/OnlineLabel';
import SearchBar from '../Components/SearchBar';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MembersActions from '../Redux/MembersRedux';
import Tutorial from '../Components/Tutorial';
// Styles
import styles from './Styles/AccessScreenStyle';
import { Colors } from '../Themes';

class Access extends React.Component {
  constructor(props) {
    super(props);
    const { box, name } = props.navigation.state.params;
    this.state = { box, name, friends: [] };
  }

  componentDidMount() {
    this.props.loadMembers(this.state.box);
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.friends) {
      this.setState({ friends: newProps.friends });
    }
  }

  onPress = user => {
    const { id, added } = user;
    this.props.membersSwitch({ box: this.state.box, id, added });
  };

  handleResults = friends => {
    this.setState({ friends });
    return null;
  };

  renderItem = ({ item }) => {
    const { added, id, image, name } = item;
    return (
      <View style={styles.userContainer}>
        <User image={image} name={name}>
          <OnlineLabel />
          <Text>{id}</Text>
        </User>
        <Icon.Button
          name={added ? 'minus' : 'plus'}
          size={12}
          borderRadius={20}
          iconStyle={{ marginLeft: 1, marginRight: -1, width: 12, height: 12 }}
          backgroundColor={added ? Colors.fire : Colors.wish}
          onPress={() => this.onPress(item)}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={`${I18n.t('manageAccess')} - ${this.state.name}`}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <View style={{ flex: 1 }}>
          <SearchBar
            showOnLoad
            autoCorrect={false}
            ref={ref => (this.searchBar = ref)}
            data={this.props.friends || []}
            handleResults={this.handleResults}
          />
          <FlatList
            onRefresh={() => this.props.loadMembers(this.state.box)}
            refreshing={this.props.refreshing}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item, index) => index}
            data={this.state.friends}
            renderItem={this.renderItem}
          />
        </View>
        {!this.props.refreshing && <Tutorial route='access' />}
      </View>
    );
  }
}

Access.contextTypes = {
  goBack: React.PropTypes.func
};

const mapStateToProps = state => ({
  // box: state.myboxes.selected,
  friends: state.members.payload,
  refreshing: !!state.members.fetching
});

const mapDispatchToProps = dispatch => ({
  loadMembers: id => dispatch(MembersActions.membersRequest(id)),
  membersSwitch: data => dispatch(MembersActions.membersSwitch(data)),
  membersRemove: data => dispatch(MembersActions.membersRemove(data))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.members.payload, next.members.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(Access);
