import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import styles from './Styles/StackImagesStyle';
import { Fonts, Images } from '../Themes';

const StackImages = props => {
  const { images, label, large } = props;
  const pics = [...images]; //[...images, ...images, ...images, ...images, ...images];
  const list = pics.reverse().slice(0, large ? 5 : 3);
  const count = list.length;
  if (count === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.labelText, fontSize]}>0 {label}</Text>
      </View>
    );
  }
  const circleStyle = large ? styles.large : styles.image;
  const fontSize = { fontSize: large ? Fonts.size.h6 : Fonts.size.small };
  return (
    <View style={[styles.container, { flexDirection: 'row', marginLeft: large ? 17 : 7 }]}>
      {list.map((p, i) => (
        <CachedImage
          key={i}
          source={{ uri: window.fix(p), cache: 'force-cache' }}
          defaultSource={Images.defaultImage}
          style={circleStyle}
        />))}
      <TouchableOpacity
        style={[circleStyle, styles.count]}
        disabled={!props.onPress}
        onPress={props.onPress}
      >
          <Text style={[styles.countText, fontSize]}>+{count}</Text>
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', paddingHorizontal: 5 }}>
        <Text style={[styles.labelText, fontSize]}>{label}</Text>
      </View>
    </View>
  );
};

export default StackImages;
