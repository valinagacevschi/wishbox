import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Styles/ButtonStyle';
import { Icons } from '../Themes';

const Button = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress} >
    <Icons name={props.icon || props.label} size={16} color={props.color} />
    <Text style={[styles.label, { color: props.color }]}>
      {props.label.replace('-', ' ').toUpperCase()}
    </Text>
  </TouchableOpacity>
);

export default Button;
