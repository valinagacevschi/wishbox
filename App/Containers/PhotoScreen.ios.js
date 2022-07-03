import React from 'react';
import { View, TouchableOpacity } from 'react-native';
// import { connect } from 'react-redux';
// import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoView from 'react-native-photo-view';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Swiper from '../Components/Swiper';
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
        <Swiper
          removeClippedSubviews={false}
          contentContainerStyle={styles.wrapper}
          autoplay
          activeDotStyle={{ marginBottom: 0 }}
          activeDotColor={Colors.wish}
          dotStyle={styles.dotStyle}
        >
          {this.state.images.map((uri, i) =>
            <PhotoView
              key={i}
              source={{ uri: window.fix(uri) }}
              maximumZoomScale={4}
              style={styles.photoView}
            />
          )}
        </Swiper>
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
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  dotStyle: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.charcoal,
    borderWidth: 0.85,
  },
};
