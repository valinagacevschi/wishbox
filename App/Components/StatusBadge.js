import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/StatusBadgeStyle';
import { Icons, Colors } from '../Themes';

const StatusBadge = props => {
  const status = props.status;
  let { icon, bgColor, state } = { };
  // status: ["open", "subscribed", "accept", "suggest", "purchased", "received", "reject" ]
  // state: ["available", "split", "subscribed", "xpired"]
  if (status === 'open') {
    bgColor = Colors.wish; //verde
    icon = 'items';
    state = 'available';
  } else if (status === 'subscribed') {
    bgColor = Colors.fire; // rosu
    icon = 'edit';
    state = 'reserved';
  } else if (status === 'accept') { 
    bgColor = Colors.wish; // verde
    icon = 'check';
    state = 'available';
  } else if (status === 'suggest') {
    bgColor = Colors.blue; // albastru
    icon = 'suggest';
    state = 'suggested';
  } else if (status === 'purchased') {
    bgColor = Colors.background;
    icon = 'purchased';
  } else if (status === 'received') {
    bgColor = Colors.background;
    icon = 'check';
  } else if (status === 'reserved') {
    bgColor = Colors.fire; // rosu
    icon = 'private';
  } else if (status === 'split') {
    bgColor = Colors.wish;
    icon = 'split';
    state = 'split';
  } else if (status === 'closed') {
    bgColor = Colors.frost;
    icon = 'remove';
  }
  state = state || status;
  return (
    <View style={[styles.container, props.style]}>
      <Icons.Button
        name={icon}
        backgroundColor={bgColor}
        size={9}
        borderRadius={19}
        style={styles.icon}
      >
        <Text style={styles.status}>{state.capitalizeFirstLetter()}</Text>
      </Icons.Button>
    </View>
  );
};

export default StatusBadge;
