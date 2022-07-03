import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icons, Colors } from '../Themes';
import styles from './Styles/RoundedButtonStyles';

const RoundedButton = props => {
  const stylingButton = [
    props.cancel && styles.buttonCancel,
    props.ok && styles.buttonOk,
    props.style
  ];
  const stylingText = [
    props.cancel && styles.textCancel,
    props.ok && styles.textOk,
    props.textStyle
  ];

  const iconColor = (props.ok && Colors.wish) || (props.cancel && Colors.fire);

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.button, ...stylingButton]}
      onPress={props.onPress}
    >
      {props.icon && (
        <Icons name={props.icon} size={18} color={iconColor} style={{ marginRight: 10 }} />
      )}
      <Text style={[styles.buttonText, ...stylingText]}>
        {props.text || props.children || ''}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
