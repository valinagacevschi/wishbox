import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import Header from '../Components/Header';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SubscriptionsActions from '../Redux/SubscriptionsRedux';
import ToGetItem from '../Components/ToGetItem';
// Styles
import styles from './Styles/ToGetScreenStyle';
import { Colors } from '../Themes';

class ToGet extends React.Component {
  componentDidMount() {
    this.props.getSubscriptions();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('toGet')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          refreshing={this.props.fetching}
          onRefresh={() => this.props.getSubscriptions()}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => index}
          data={this.props.subscriptions}
          renderItem={({ item }) => <ToGetItem item={item} />}
        />
      </View>
    );
  }
}

ToGet.contextTypes = {
  goBack: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
  fetching: !!state.subscriptions.fetching,
  subscriptions: state.subscriptions.payload,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscriptions: () => dispatch(SubscriptionsActions.subscriptionsRequest()),
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.subscriptions.payload, next.subscriptions.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(ToGet);
