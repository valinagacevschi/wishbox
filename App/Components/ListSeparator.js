import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/ListSeparatorStyle';

const ListSeparator = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.text}</Text>
    {props.count >= 0 && (
      <View style={styles.bubble}>
        <Text style={styles.btext}>{props.count}</Text>
      </View>
    )}
  </View>
);

export default ListSeparator;
