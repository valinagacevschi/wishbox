import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './Styles/IconButtonStyle';
import { Icons, Colors, } from '../Themes';

const IconButton = props => {
  const size = props.size || 24;
  const d = (size * 2) + 8;
  const br = size + 4;
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.boxItem, props.style]}>
      <View style={{}}>
        <View
          style={[styles.iconbox, {
            backgroundColor: props.bgColor || Colors.wish,
            width: d,
            height: d,
            borderRadius: br }]}
        >
          <Icons
            name={props.icon}
            size={size}
            color={Colors.snow}
          />
        </View>
        {(size > 15) && <View style={styles.textbox}>
          <Text style={[styles.text, { fontSize: size * 1 / 1.8 }]}>
            {props.label}
          </Text>
        </View>}
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
