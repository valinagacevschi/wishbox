import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
// import Swiper from 'react-native-swiper';
import Swiper from '../Components/Swiper';
import xstyles from './Styles/ProductSiderStyle';
import { Colors, Images } from '../Themes';

export default class ProductSider extends React.Component {
  renderProduct = (url, i) => {
    const uri = window.fix(url);
    return (
      <CachedImage
        key={i}
        resizeMode="contain"
        defaultSource={Images.defaultImage}
        style={styles.imageStyle}
        source={{ uri, cache: 'force-cache' }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 20, borderColor: Colors.title, borderBottomWidth: 0.35 }}>
          <Swiper
            removeClippedSubviews={false}
            style={styles.wrapper}
            height={150}
            autoplay
            activeDotStyle={{ marginBottom: -60 }}
            activeDotColor={Colors.wish}
            dotStyle={styles.dotStyle}
          >
            {this.props.product.images.map((uri, i) => this.renderProduct(uri, i))}
          </Swiper>
        </View>
        {this.props.showPrice && (
          <View style={styles.priceTag}>
            <Text style={styles.price}>
              {this.props.product.price || 0} {this.props.product.currency}
            </Text>
          </View>
        )}
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  dotStyle: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.charcoal,
    borderWidth: 0.85,
    marginBottom: -60
  }
};
