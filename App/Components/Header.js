// @flow

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import IconPress from './IconsPress';
import styles from './Styles/HeaderStyle';
// import { Colors, Metrics, Icons } from '../Themes';

const Header = (props) => (
  <View style={[styles.header, props.headerStyle]}>
    <IconPress
      name={props.leftIcon}
      color={props.leftIconColor}
      size={props.leftIconSize}
      onPress={props.leftIconPress}
    />
    <Text numberOfLines={1} style={[styles.text, !props.rightIcon && styles.noRight, props.textStyle]}>
      {props.title}
      {props.counter && <View style={styles.bullet}>
        <Text style={styles.bulletText}>{props.counter}</Text>
      </View>}
    </Text>
    {props.rightIcon && <IconPress
      name={props.rightIcon || 'reserved'}
      color={props.rigthIconColor}
      size={props.rightIconSize || 22}
      buttonStyle={{ marginRight: 10 }}
      onPress={props.rightIconPress}
    />}
    {props.rightButton &&
      <TouchableOpacity style={styles.btn} onPress={props.rightBtnPress}>
        <Text style={styles.btnText}>{props.rightBtnText}</Text>
      </TouchableOpacity>
    }
  </View>
);

Header.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func,
};

export default Header;
