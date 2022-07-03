import React from 'react';
import { ScrollView, FlatList, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProductsActions from '../Redux/ProductsRedux';
import WebProductsActions from '../Redux/WebProductsRedux';

import Header from '../Components/Header';
import RoundedInput from '../Components/RoundedInput';
import RoundedButton from '../Components/RoundedButton';
import ProductItem from '../Components/ProductItem';
import Tutorial from '../Components/Tutorial';
// import { tutorial } from '../Config';
// Styles
import styles from './Styles/SearchScreenStyle';
import { Colors, Fonts, Images } from '../Themes';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    const { box } = props.navigation.state.params || {};
    this.state = {
      text: '',
      hidden: false,
      box,
    };
  }

  onSubmit = text => {
    this.props.search(text);
    // this.refs.webinput.setNativeProps({ value: text });
    this.refs.view &&
      this.refs.view.animate('fadeOutUp', 600, 0).then(() => {
        this.setState({ hidden: true, text });
      });
  };

  onPressSearch = () => {
    if (this.state.text) this.props.getWebProducts(this.state.text);
    this.context.goTo('searchweb', { query: this.state.text, box: this.state.box });
  };

  onPressAddCustom = () => {
    this.context.goTo('addcustom', { box: this.state.box, query: this.state.text });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title="Add Item"
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
          textStyle={{ marginRight: 40 }}
        />
        {!this.state.hidden && (
          <Animatable.View useNativeDriver ref="view" style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={Images.searchBgr} style={styles.topBgr} />
              <Image source={Images.logoSearch} resizeMode="contain" style={styles.logoSearch} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>Name of your item</Text>
                <RoundedInput
                  autoFocus
                  placeholder="Type Name:"
                  onSubmit={this.onSubmit}
                />
                <View />
              </View>
            </View>
          </Animatable.View>
        )}
        {this.state.hidden && (
          <View style={{ flex: 1, marginBottom: 0 }}>
            <ScrollView style={{ flex: 1 }}>
              <RoundedInput
                placeholder="Type Name:"
                value={this.state.text}
                returnKeyType="search"
                onSubmit={this.onSubmit}
                onChangeText={text => this.setState({ text })}
              />
              <RoundedButton
                ok
                icon="search-the-web"
                text={'Search the web'}
                onPress={this.onPressSearch}
                style={{ marginHorizontal: 10, marginVertical: 5 }}
              />
              <FlatList
                keyExtractor={(item, index) => index}
                contentContainerStyle={styles.list}
                data={this.props.payload}
                renderItem={({ item }) => <ProductItem product={item} box={this.state.box} />}
              />
            </ScrollView>
            <RoundedButton
              text={'Add custom'}
              onPress={this.onPressAddCustom}
              style={{ margin: 5, marginBottom: 5 }}
            />
            {!this.props.refreshing && <Tutorial route='addItem' />}
          </View>
        )}
      </View>
    );
  }
}

SearchScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const mapStateToProps = state => ({
  tutorialOn: state.profile.tutorialOn,
  refreshing: state.products.fetching,
  payload: state.products.payload
});

const mapDispatchToProps = dispatch => ({
  search: id => dispatch(ProductsActions.productsSearch(id)),
  getWebProducts: query => dispatch(WebProductsActions.webProductsRequest(query))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.products.payload, next.products.payload)
  && prev.profile.tutorialOn === next.profile.tutorialOn
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(SearchScreen);
//export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
