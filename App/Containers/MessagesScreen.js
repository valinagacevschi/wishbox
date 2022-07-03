// @flow

import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  // RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import NotesActions from '../Redux/NotesRedux';
// import FeedActions from '../Redux/FeedRedux';
import Header from '../Components/Header';
// import IconTab from '../Navigation/IconTab';
import { Colors, Icons } from '../Themes';
import { routeTo } from '../Config';

// Styles
import xstyles from './Styles/MessagesScreenStyle';

class MessagesScreen extends React.Component {
  // static navigationOptions = {
  //   header: { visible: false },
  //   tabBarIcon: props => <IconTab name="menu4" {...props} />
  // };

  constructor(props) {
    super(props);
    this.state = {
      currentlyOpenSwipeable: null,
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getNotes();
    }
  }

  onPress = item => {
    this.props.markNote(item.id);
    routeTo(item.options, null, this.context.goTo);
  };

  onRefresh = () => {
    this.props.getNotes();
  }

  deleteRow = (data) => {
    Alert.alert('Deleting Message', 'Are you sure ?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => this.props.deleteNotes(data.id), style: 'destructive' }
    ]);
  }

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  renderItem = ({ item }) => {
    const { message, read, time } = item;
    const { currentlyOpenSwipeable } = this.state;
    const fontWeight = read ? 'normal' : 'bold';
    return (
      <Swipeable
        onRightButtonsOpenRelease={(event, gestureState, swipeable) => {
          if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
            currentlyOpenSwipeable.recenter();
          }
          this.setState({ currentlyOpenSwipeable: swipeable });
        }}
        onRightButtonsCloseRelease={() => this.setState({ currentlyOpenSwipeable: null })}
        rightButtons={[
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: Colors.fire, justifyContent: 'center' }}
            onPress={() => this.deleteRow(item)}
          >
            <Text style={[styles.backTextWhite, { paddingLeft: 25 }]}>X</Text>
          </TouchableOpacity>
        ]}
        style={styles.swipe}
      >
        <TouchableHighlight onPress={() => this.onPress(item)}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <Icons name="menu4" size={16} color={Colors.snow} />
            </View>
            <View style={styles.message}>
              <Text style={[styles.msgText, { fontWeight }]} numberOfLines={2}>
                {message}
              </Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{time}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header title={I18n.t('messages')} leftIcon={'wishbox-logo'} leftIconColor={Colors.wish} />
        <FlatList
          onScroll={this.handleScroll}
          keyExtractor={(item, index) => index}
          onRefresh={this.onRefresh}
          refreshing={this.props.refreshing}
          contentContainerStyle={styles.listContent}
          data={this.props.notes}
          renderItem={this.renderItem}
          directionalLockEnabled
        />
      </View>
    );
  }
}

MessagesScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles,
  swipe: {
    flex: 1,
    marginBottom: 4
  }
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.user !== null,
  refreshing: !!state.notes.fetching,
  notes: state.notes.payload
});

const mapDispatchToProps = dispatch => ({
  getNotes: () => dispatch(NotesActions.notesRequest()),
  markNote: id => dispatch(NotesActions.notesMark(id)),
  markNotes: () => dispatch(NotesActions.notesMarkAll()),
  deleteNotes: id => dispatch(NotesActions.notesDelete(id)),
  // loadCounters: () => dispatch(FeedActions.countersRequest()),
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.notes.payload, next.notes.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(MessagesScreen);
