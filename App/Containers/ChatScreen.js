import React from 'react';
import { View, FlatList, Platform, Keyboard } from 'react-native';
import I18n from 'react-native-i18n';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import BoxItemActions from '../Redux/BoxItemRedux';
import Header from '../Components/Header';
import Comment from '../Components/Comment';
import SendBox from '../Components/SendBox';
// Styles
import xstyles from './Styles/ChatScreenStyle';
import { Colors } from '../Themes';

const height = 75;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { chatters, id } = props.navigation.state.params;
    this.state = { chatters, id };
  }

  componentDidMount() {
    this.props.getComments(this.state.id);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.scrollToEnd);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.scrollToEnd);    
  }

  shouldComponentUpdate(nextProps) {
    return this.props.comments.length !== nextProps.comments.length;
  }

  onSend = (text) => {
    this.props.addComment(this.state.id, text);
  };

  componentWilUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  scrollToEnd = () => {
    setTimeout(() => this.chat && this.chat.scrollToEnd({ animated: true }), 600);
    // this.chat && this.chat.scrollToEnd({ animated: true });
  }

  renderItem = ({ item }) => (
    <Comment comment={item} style={[styles.comment, { height }]} />
  );

  render() {
    const { comments } = this.props;
    if (comments && comments.length >= 5) {
      this.scrollToEnd();
    }
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('privateChat')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
          rightIcon={'info'}
          rightIconSize={18}
          rightIconPress={() => this.context.goTo('chatinfo', { chatters: this.state.chatters })}
        />
        <View style={styles.containter}>
          <FlatList
            ref={chat => (this.chat = chat)}
            // onRefresh={() => this.props.getComments(this.state.id)}
            // refreshing={this.props.refreshing}
            contentContainerStyle={[styles.grid, { marginHorizontal: 5 }]}
            keyExtractor={(item, index) => index}
            data={comments}
            renderItem={this.renderItem}
            getItemLayout={(data, index) => ({ length: height, offset: height * index, index })}
          />
          <SendBox
            style={styles.sendBox}
            prompt='Message:'
            onSend={this.onSend}
          />
          <KeyboardSpacer topSpacing={-50} />
        </View>
      </View>
    );
  }
}

Chat.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func,
};

const styles = {
  ...xstyles,
  containter: {
    flex: 1,
    marginBottom: 0,
  },
  grid: {
    // flex: 1,
    // alignItems: 'flex-start',
  },  
  comment: {
    padding: 10,
    borderColor: '#e0e0e0',
  },
  sendBox: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    ...Platform.select({
        ios: { paddingVertical: 5, },
        android: {
          paddingBottom: 0,
          paddingTop: 5,
        },
    }),
    // alignItems: 'flex-start',
    borderColor: Colors.steel,
    borderTopWidth: 1,
  },
};

const mapStateToProps = (state) => ({
  refreshing: state.boxItem.fetching,
  comments: state.boxItem.comments && state.boxItem.comments.filter((c) => c.private === true),
});

const mapDispatchToProps = (dispatch) => ({
  getComments: (id) => dispatch(BoxItemActions.boxItemCommRequest(id)),
  addComment: (id, comment) => dispatch(BoxItemActions.boxItemAddCommRequest(id, comment, true)),
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.boxItem.comments, next.boxItem.comments)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(Chat);
// export default connect(mapStateToProps, mapDispatchToProps)(Chat);
