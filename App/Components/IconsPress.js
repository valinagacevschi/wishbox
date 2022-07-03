import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import styles from './Styles/IconsPressStyle';
import { Colors, Metrics, Icons } from '../Themes';

const IconsPress = props => (
  <TouchableOpacity
    style={[styles.buttonStyle, props.buttonStyle]}
    onPress={() => props.onPress && props.onPress()}
  >
    <Icons
      name={props.name}
      color={props.color || Colors.wish}
      size={props.size || Metrics.icons.medium}
      style={[styles.icon, props.iconStyle]}
    />
  </TouchableOpacity>
);

export default IconsPress;
