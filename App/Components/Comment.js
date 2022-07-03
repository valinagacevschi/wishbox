import React from 'react';
import { View, Text } from 'react-native';
import User from './User';
import styles from './Styles/CommentStyle';

export default class Comment extends React.Component {
  render() {
    const { user, image, date, comment } = this.props.comment;
    return (
      <View style={[styles.comment, this.props.style]}>
        <User name={user} image={image} right={date}>
          <Text style={{ paddingTop: 10 }}>{comment || ''}</Text>
        </User>
      </View>
    );
  }
}

