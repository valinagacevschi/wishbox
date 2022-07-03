import React from 'react';
import { View, Text } from 'react-native';
import StackImages from './StackImages';
import styles from './Styles/BarLikeStyle';
// import { Colors, Metrics, Fonts } from '../Themes';

const BarLike = props => (
  <View style={[styles.barLikes, props.style]}>
    <StackImages
      images={props.liked.map(l => l.image)}
      count={props.likes}
      label={props.likes === 1 ? 'Like' : 'Likes'}
    />
    <View style={styles.segmentLikes}>
      <Text style={styles.smallText}>
        {props.commentsNo} {props.commentsNo === 1 ? 'Comment' : 'Comments'}
      </Text>
    </View>
    <View style={[styles.segmentLikes, { alignItems: 'flex-end' }]}>
      <Text style={styles.smallText}>
        {props.boxesNo} {props.boxesNo === 1 ? 'Box' : 'Boxes'}
      </Text>
    </View>
  </View>
);

export default BarLike;
