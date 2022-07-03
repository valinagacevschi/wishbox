import React from 'react';
import { View, FlatList } from 'react-native';
import I18n from 'react-native-i18n';
// import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Avatar from '../Components/Avatar';
// Styles
import styles from './Styles/ContributorsScreenStyle';
import { Colors } from '../Themes';

export default class Contributors extends React.Component {
  constructor(props) {
    super(props);
    const { subscribers } = props.navigation.state.params || {};
    this.state = {
      subscribers
    };
  }

  onPressOwner = (user) => {
    this.context.goTo('wishlist', { user });
  };

  handleResults = subscribers => {
    this.setState({ subscribers });
  };

  renderItem = ({ item }) => <Avatar user={item} onPressOwner={() => this.onPressOwner(item)} />;

  render() {
    const { subscribers, subscribersCount } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('contributors')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          counter={subscribersCount}
          leftIconPress={() => this.context.goBack()}
        />
        <SearchBar
          showOnLoad
          autoCorrect={false}
          ref={ref => (this.searchBar = ref)}
          data={subscribers}
          handleResults={this.handleResults}
        />
        <FlatList
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          data={this.state.subscribers}
          renderItem={this.renderItem}
          pageSize={20}
        />
      </View>
    );
  }
}

Contributors.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

// const mapStateToProps = (state) => ({
// });

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Contributors);
