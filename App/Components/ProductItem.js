import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/ProductItemStyle';
import { Colors, Images } from '../Themes';

export default class ProductItem extends React.Component {
  onPressAdd = () => {
    if (this.props.onPressAdd) {
      this.props.onPressAdd(this.props.product);
    } else {
      const { product, box } = this.props;
      this.context.goTo('additem', { product, box });
    }
  }

  render() {
    const { name, price, images, currency } = this.props.product;
    const uri = window.fix(images[0]);
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPressAdd}> 
        <View style={styles.imageBox}>
          <CachedImage
            source={{ uri, cache: 'force-cache' }}
            defaultSource={Images.defaultImage}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <Text style={styles.price}>
            {price || 0} {currency}
          </Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Icon.Button
            name='plus'
            size={12}
            borderRadius={20}
            iconStyle={styles.icon}
            backgroundColor={Colors.wish}
            onPress={this.onPressAdd}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

ProductItem.contextTypes = {
  goTo: React.PropTypes.func
};
