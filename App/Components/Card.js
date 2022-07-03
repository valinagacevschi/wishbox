import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/CardStyle';
import { Colors, Icons } from '../Themes';


const Card = (props) => (
  <View style={styles.container}>
    <View style={styles.titleBox}>
      <Text style={styles.title}>{props.title.toUpperCase()}</Text>
      <Icons name={props.icon} color={Colors.title} size={16} />
    </View>
    {props.children}
  </View>
);

export default Card;
