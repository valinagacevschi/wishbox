import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import StatusBadge from './StatusBadge';
import styles from './Styles/ToGetItemStyle';
import { Images } from '../Themes';

export default class ToGetItem extends React.Component {
  onPressItem = () => {
    this.context.goTo('boxitem', { boxItem: this.props.item });
  }

  render() {
    const { product, owner, timeDate, status } = this.props.item;
    const { name, images } = product;
    const uri = window.fix(images[0]);
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPressItem}>
        <View style={styles.imageBox}>
          <CachedImage
            source={{ uri, cache: 'force-cache' }}
            defaultSource={Images.defaultImage}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.name}>{owner.name}</Text>
          <Text style={styles.store}>{name}</Text>
          <Text style={styles.price}>{timeDate.trim()}</Text>
        </View>
        <StatusBadge style={{ flex: 0 }} status={status} />
      </TouchableOpacity>
    );
  }
}

ToGetItem.contextTypes = {
  goTo: React.PropTypes.func,
};
