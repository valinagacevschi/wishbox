import React from 'react';
import { View, Text } from 'react-native';

import xstyles from './Styles/IconTabStyle';
import { Colors, Metrics, Icons } from '../Themes';

const IconTab = props => (
  <View style={[styles.tabButton, props.focused && styles.tabSelected]}>
    <Icons
      name={props.name || 'ellipsis-h'}
      color={props.focused ? Colors.wish : Colors.background}
      size={props.focused ? 22 : Metrics.icons.small}
      style={[styles.icon, props.focused && styles.iconSelected]}
    />
    {props.value && props.value !== '0' && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{props.value}</Text>
      </View>
    )}
  </View>
);

const styles = {
  ...xstyles,
  badge: {
    position: 'absolute',
    top: 3,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    backgroundColor: Colors.transparent
  }
};

export default IconTab;
