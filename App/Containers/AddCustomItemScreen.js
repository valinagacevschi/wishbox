import React from 'react';
import { View, Text, Platform, Alert, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import R from 'ramda';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import RoundedButton from '../Components/RoundedButton';
import Header from '../Components/Header';
import CamBar from '../Components/CamBar';
import IconButton from '../Components/IconButton';
import Uploader from '../Services/Uploader';
import ItemForm from '../Components/ItemForm';
import Tutorial from '../Components/Tutorial';
// Styles
import styles from './Styles/AddCustomItemScreenStyle';
import { Colors, Fonts, Images } from '../Themes';

const uploader = Uploader.create();

export default class AddCustomItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const { box, query } = props.navigation.state.params;
    this.state = {
      images: [],
      paths: [],
      progress: [],
      ids: [],
      urls: [],
      complete: [],
      name: null,
      description: null,
      note: null,
      price: null,
      currency: 'LEI',
      store: null,
      box,
      query,
    };
  }

  onUpload = () => {
    const { name, price, paths } = this.state;
    let images = this.state.images;
    if (Platform.OS === 'android') {
      images = paths;
    }
    if (R.isEmpty(images)) {
      return Alert.alert('Warning', 'No Images selected. Add at least one image.');
    }
    if (!name || !price) {
      return Alert.alert('Warning', 'Please fill the details below.');
    }
    images.map((path, index) =>
      uploader.upload(path.uri, path.data, index, this.onProgress, this.onError, this.onComplete)
    );
  };

  onProgress = (data, index) => {
    const progress = this.state.progress;
    progress[index] = Math.round(data.progress);
    this.setState({ progress });
  };

  onError = () => { };

  onComplete = (data, index) => {
    if (data.responseBody) {
      data = JSON.parse(data.responseBody);
    }
    // const response = JSON.parse(data.responseBody);
    const { url, id } = data;
    const { ids, urls, complete, name, price } = this.state;
    ids[index] = id;
    urls[index] = url;
    complete[index] = true;
    this.setState({ ids, urls, complete });
    const done = name && price && complete.reduce((result, val) => result && val, true);
    if (done) {
      this.context.goTo('newitem', { item: { ...this.state, images: this.state.urls } });
    }
  };

  onChange = fields => {
    const { name, description, note, price, currency, store } = fields;
    this.setState({
      name,
      description,
      note,
      price,
      currency,
      store
    });
  };

  onRemoveImage = index => {
    const { images, paths, progress, ids, urls } = this.state;
    [images, paths, progress, ids, urls].map(a => a.splice(index, 1));
    this.setState({ images, paths, progress, ids, urls });
  };

  addImage = response => {
    if (response.didCancel) {
      __DEV__ && console.log('User cancelled image picker');
    } else if (response.error) {
      __DEV__ && console.log('ImagePicker Error: ', response.error);
    } else {
      // const { link } = response.data;
      this.setState({
        images: [...this.state.images.slice(-2), { uri: response.uri, data: response.data }],
        paths: [...this.state.paths.slice(-2), { uri: response.path || response.uri }],
        progress: [...this.state.progress.slice(-2), 0],
        ids: [...this.state.ids.slice(-2), -1],
        urls: [...this.state.urls.slice(-2), ''],
        complete: [...this.state.complete.slice(-2), false]
      });
    }
  };

  renderImage = (image, i, size) => {
    const progress = this.state.progress[i];
    return (
      <View key={i}>
        <Image
          source={{ ...image, cache: 'force-cache' }}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
        {progress > 0 && <Text style={styles.progress}>{progress}%</Text>}
        {progress < 100 && (
          <IconButton
            icon="closed"
            color={Colors.snow}
            bgColor={Colors.fire}
            size={6}
            style={{ marginTop: -10 }}
            onPress={this.onRemoveImage.bind(this, i)}
          />
        )}
      </View>
    );
  };

  render() {
    const imageCount = this.state.images.length;
    const areImages = imageCount > 0;
    const size = 90; // imageCount > 3 ? 70 : 90;
    const barSize = areImages ? 12 : 24;
    const camBarStyle = areImages ? { alignSelf: 'center', width: 240 } : { marginTop: 40 };
    return (
      <View style={styles.mainContainer}>
        <Header
          title="New Item"
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
          textStyle={{ marginRight: 40 }}
        />
        <View style={styles.header}>
          <Image resizeMode="cover" style={styles.topBgr} source={Images.customBgr} />
          {areImages && (
            <View style={styles.gallery}>
              {this.state.images.map((image, i) => this.renderImage(image, i, size))}
            </View>
          )}
          <CamBar size={barSize} style={camBarStyle} query={this.state.query} onImageReady={this.addImage} />
        </View>
        <KeyboardAwareScrollView style={styles.kbView}>
          <ItemForm 
            formStyle={{ paddingBottom: Platform.OS === 'ios' ? 0 : 90 }}
            enabled 
            onChange={this.onChange} onSubmit={this.onUpload} 
          />
        </KeyboardAwareScrollView>
        <View style={{ marginBottom: 0 }}>
          <RoundedButton style={styles.addItem} onPress={this.onUpload}>
            Add Item
          </RoundedButton>
        </View>
        {<Tutorial route='addcustom' />}
      </View>
    );
  }
}

AddCustomItemScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

// const mapStateToProps = (state) => ({
// });
//
// export default connect(mapStateToProps)(AddCustomItemScreen);
