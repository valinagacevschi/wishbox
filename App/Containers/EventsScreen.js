import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import I18n from 'react-native-i18n';
import EventsActions from '../Redux/EventsRedux';
import UserBoxesActions from '../Redux/UserBoxesRedux';
import Header from '../Components/Header';
import Box from '../Components/Box';
// Styles
import xstyles from './Styles/EventsScreenStyle';
import { Colors } from '../Themes';

class EventsScreen extends React.Component {
  componentDidMount() {
    this.props.getEvents();
  }

  onPressBox = (item) => {
    this.props.userSelect(item);
    this.context.goTo('wishbox', { 
      user: item.owner,
      box: item,
     });
  }

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => this.onPressBox(item)}>
        <Box dark name={item.uname} item={item} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('events')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          refreshing={this.props.fetching}
          onRefresh={() => this.props.getEvents()}
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          data={this.props.events}
          renderItem={this.renderItem}
          pageSize={20}
        />
      </View>
    );
  }
}

EventsScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles
};

const mapStateToProps = state => ({
  fetching: !!state.events.fetching,
  events: state.events.payload
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(EventsActions.eventsRequest()),
  userSelect: box => dispatch(UserBoxesActions.userBoxesSelect(box))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
