import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image, { ViewPagerZoom } from 'react-native-image-zoom';
// Styles
import xstyles from './Styles/PhotoScreenStyle';
import { Colors, Metrics } from '../Themes';

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    const { images } = props.navigation.state.params;
    this.state = { images };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ViewPagerZoom style={{ flex: 1 }}>
          {this.state.images.map((uri, i) =>
            <View key={i} style={styles.cover}>
              <Image 
                source={{ uri: window.fix(uri), cache: 'force-cache' }} 
                style={styles.photoView} 
              />
            </View>
          )}
        </ViewPagerZoom>
        <TouchableOpacity style={styles.close} onPress={() => this.context.goBack()}>
          <Icon name='close' size={24} color={Colors.snow} />
        </TouchableOpacity>
      </View>
    );
  }
}

Photo.contextTypes = {
  goBack: React.PropTypes.func,
};

const styles = {
  ...xstyles,
  cover: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoView: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
};
