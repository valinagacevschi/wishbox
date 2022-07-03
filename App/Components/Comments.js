import React from 'react';
import { ScrollView, FlatList, View, Text } from 'react-native';
import Comment from '../Components/Comment';
import SendBox from '../Components/SendBox';
// import styles from './Styles/CommentsStyle';
import { Colors, Fonts } from '../Themes';

export default class Comments extends React.PureComponent {
  render() {
    const noComments = !this.props.comments || this.props.comments.length === 0;
    return (
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={(this.props.comments || []).filter((c) => c.private === false)}
          renderItem={({ item }) => <Comment comment={item} />}
          pageSize={20}
        />
        {false && noComments && <View>
          <Text style={{ ...Fonts.style.normal, color: Colors.coal }}>
            No coments just yet. Be the first to comment!
          </Text>
        </View>}
        <SendBox onSend={(text) => this.props.onSend(text)} />
      </ScrollView>
    );
  }
}
