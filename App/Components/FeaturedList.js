import React from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import _ from 'lodash'; 
import styles from './Styles/FeaturedStyle';

class FeaturedList extends React.Component {
  renderItem = ({ item }) => {
    const { images, name } = item;
    const uri = window.fix(images[0]);
    return (
      <TouchableOpacity onPress={() => this.context.goTo('newitem', { item })}>
        <View style={styles.container}>
          <CachedImage 
            resizeMode='contain' 
            style={styles.image} 
            source={{ uri, cache: 'force-cache' }} 
          />
          <Text numberOfLines={1} tyle={styles.label}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.props.featured) {
      return null;
    }
    return (
      <FlatList
        horizontal
        data={this.props.featured}
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem}
      />
    );
  }
}

FeaturedList.contextTypes = {
  goTo: React.PropTypes.func
};

const mapStateToProps = state => ({
  fetching: state.products.fetching,
  featured: state.products.results && state.products.results.featured
});


const areStatesEqual = (prev, next) => (
  prev.products.results 
  && next.products.results 
  && _.isEqual(prev.products.results.featured, next.products.results.featured)
);

export default connect(mapStateToProps, null, null, { areStatesEqual })(FeaturedList);
// export default connect(mapStateToProps)(FeaturedList);
