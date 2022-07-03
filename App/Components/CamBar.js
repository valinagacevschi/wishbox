import React from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import IconButton from './IconButton';
import styles from './Styles/CamBarStyle';

const options = {
  rotation: 0,
  mediaType: 'photo',
  maxWidth: 1136,
  maxHeight: 640,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class CamBar extends React.Component {
  onPressCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      this.props.onImageReady(response);
    });
  }

  onPressLib = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      this.props.onImageReady(response);
    });
  }

  onPressSearch = () => {
    this.context.goTo('webImage', { onSelectImage: this.onSelectImage, query: this.props.query });
  }

  onSelectImage = (data) => {
    this.props.onImageReady({ ok: true, ...data });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <IconButton
          label="Take Photo"
          size={this.props.size}
          icon="add-image"
          onPress={this.onPressCamera}
        />
        <IconButton
          label="Camera Roll"
          size={this.props.size}
          icon="camera-roll"
          onPress={this.onPressLib}
        />
        {this.props.search && <IconButton
          label="Image Search"
          size={this.props.size}
          icon="search"
          onPress={this.onPressSearch}
        />}
      </View>
    );
  }
}

CamBar.contextTypes = {
  goTo: React.PropTypes.func,
};

// Defaults for props
CamBar.defaultProps = {
  search: true,
  size: 12,
};
