import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import WebImagesActions from '../Redux/WebImagesRedux';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import RoundedButton from '../Components/RoundedButton';
// Styles
import xstyles from './Styles/WebImagesScreenStyle';
import { Colors, Metrics } from '../Themes';

class WebImages extends React.Component {
  constructor(props) {
    super(props);
    const { query } = props.navigation.state.params;
    this.state = {
      images: [],
      selected: -1,
      query,
    };
  }

  componentDidMount() {
    if (this.state.query) this.props.getWebImages(this.state.query);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.images) {
      this.setState({ images: newProps.images });
    }
  }

  onSearch = () => {
    this.setState({ images: [], selected: -1 });
    this.props.getWebImages(this.state.query);
  }

  addImage = () => {
    const uri = this.state.images[this.state.selected].imageUrl;
    // this.props.saveWebImage(link);
    this.props.navigation.state.params.onSelectImage({ uri });
    this.context.goBack();
  }

  renderHeader = () => (<SearchBar
    focusOnLayout
    handleChangeText={(query) => this.setState({ query })}
    onSubmitEditing={this.onSearch}
    onCancel={() => this.setState({ query: '', images: [], selected: -1 })}
    input={this.state.query}
  />);

  renderItem = ({ item, index }) => {
    const selected = this.state.selected === index;
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.setState({ selected: index })}>
        <CachedImage 
          resizeMode='contain' 
          source={{ uri: item.imageUrl, cache: 'force-cache' }} 
          style={styles.image} 
        />
        <View>
          <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
        </View>
        <View style={styles.radio}>
          <Icon name={selected ? 'circle' : 'circle-o'} size={16} color={Colors.wish} />
        </View>
      </TouchableOpacity>
    );
  }

  renderFooter = () => {
    if (!this.props.fetching) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={I18n.t('imageSearch')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          extraData={this.state}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onRefresh={() => this.props.getWebImages(this.state.query)}
          refreshing={this.props.refreshing}
          // contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) => index}
          data={this.state.images}
          renderItem={this.renderItem}
        />
      {this.state.selected !== -1 &&
        <View style={styles.buttonBox}>
          <RoundedButton
            style={{ margin: 0 }}
            text='Add Image'
            onPress={this.addImage}
          />
        </View>}
      </View>
    );
  }
}

WebImages.contextTypes = {
  goBack: React.PropTypes.func,
};

const styles = {
  ...xstyles,
  row: {
    // borderColor: 'red',
    // borderWidth: 1,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    marginHorizontal: Metrics.smallMargin,
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.smallMargin,
    shadowColor: Colors.steel,
    shadowOpacity: 0.75,
    shadowOffset: { height: 1 }
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    marginTop: Metrics.smallMargin,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  radio: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  text: {
    paddingHorizontal: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    fontSize: 12,
    color: Colors.charcoal,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  buttonBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderColor: 'rgba( 200, 200, 200, 0.4)',
    backgroundColor: Colors.silver,
  }
};

const mapStateToProps = (state) => ({
  images: state.webimages.payload,
  refreshing: !!state.webimages.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  getWebImages: (query) => dispatch(WebImagesActions.webImagesRequest(query)),
  saveWebImage: (link) => dispatch(WebImagesActions.webImagesSave(link)),
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.webimages.payload, next.webimages.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(WebImages);
// export default connect(mapStateToProps, mapDispatchToProps)(WebImages);
