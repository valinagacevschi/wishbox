import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import styles from './Styles/UserStyle';
import { Images } from '../Themes';

const User = props => (
  <View style={styles.user}>
    <CachedImage
      style={styles.image}
      defaultSource={Images.defaultImage}
      source={{ uri: props.image, cache: 'force-cache' }}
    />
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.nameBox}>
        <Text style={styles.name}>{props.name}</Text>
        {__DEV__ && props.id && <Text style={styles.id}>{props.id}</Text>}
        {props.right && <Text style={styles.rightLabel}>{props.right}</Text>}
      </View>
      {props.children}
    </View>
  </View>
);

export default User;
