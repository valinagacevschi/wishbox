import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import styles from './Styles/OnlineLabelStyle';
import { Colors } from '../Themes';

const OnlineLabel = (props) => (
  <View style={styles.onlineIcon}>
    <Icon
      name="circle"
      size={8}
      color={props.active ? Colors.wish : Colors.steel}
    />
    <Text style={[styles.online, { color: props.active ? Colors.wish : Colors.steel }]}>
      {props.active ? I18n.t('online') : I18n.t('offline')}
    </Text>
  </View>
);

export default OnlineLabel;
