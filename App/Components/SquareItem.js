import React from 'react';
import {
  View,
  Text,
  // Image,
  TouchableOpacity,
} from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import StatusBadge from './StatusBadge';
import styles from './Styles/SquareItemStyle';
import { Images } from '../Themes';

export default class SquareItem extends React.PureComponent {
  render() {
    const { product, status, subscriptionType: state } = this.props.boxItem;
    const { name, currency, price, images } = product;
    const image = window.fix(images[0]);
    return (
      <TouchableOpacity onPress={this.props.onPressItem}>
        <View style={[styles.gridItem]}>
          <CachedImage
            resizeMode="contain"
            style={styles.image}
            defaultSource={Images.defaultImage}
            source={{ uri: image, cache: 'force-cache' }}
          />
          <Text numberOfLines={1} style={styles.title}>
            {name}
          </Text>
          <Text numberOfLines={1} style={styles.price}>
            {price} {currency}
          </Text>
          <StatusBadge status={state === 'split' ? state : status} />
        </View>
      </TouchableOpacity>
    );
  }
}

// export default SquareItem;
