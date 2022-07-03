import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import styles from './Styles/StoreStyle';
import { Colors, Icons, Images } from '../Themes/';

export default class Store extends React.PureComponent {
  onPress = (item) => {
    this.context.goTo('web', { title: item.name, uri: item.link });
  };

  render() {
    const { name, price, icon } = this.props;
    return (
      <TouchableOpacity onPress={() => this.onPress(this.props)}>
        <View style={styles.container}>
          <CachedImage 
            resizeMode='contain' 
            style={styles.image} 
            defaultSource={Images.defaultImage}
            source={{ uri: icon, cache: 'force-cache' }} 
          />
          <View style={styles.textBox} >
            <Text style={styles.name} >{name}</Text>
            {!!price && <Text style={styles.name} >{price} lei</Text>}
          </View>
          <Icons name='arrow' size={16} color={Colors.background} style={{ marginLeft: 15 }} />
        </View>
      </TouchableOpacity>
    );
  }
}

// const styles = {
//   ...xstyles,
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingBottom: 5,
//   },
//   image: {
//     marginRight: 15,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 4,
//     width: 50,
//     height: 50,
//   },
//   textBox: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   name: {
//     fontSize: 16,
//     color: Colors.background
//   }  
// };

Store.contextTypes = {
  goTo: React.PropTypes.func,
};
