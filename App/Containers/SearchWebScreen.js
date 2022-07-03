import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import WebProductsActions from '../Redux/WebProductsRedux';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import ProductItem from '../Components/ProductItem';
// Styles
import xstyles from './Styles/SearchWebScreenStyle';
import { Colors } from '../Themes';

class SearchWeb extends React.Component {
  constructor(props) {
    super(props);
    const { query, box } = props.navigation.state.params || {};
    this.state = { query, box };
  }

  onSearch = () => {
    this.props.getWebProducts(this.state.query);
  }

  renderHeader = () => (
    <SearchBar
      focusOnLayout
      handleChangeText={query => this.setState({ query })}
      onSubmitEditing={this.onSearch}
      onCancel={() => this.setState({ query: '' })}
      input={this.state.query}
    />
  );

  renderFooter = () => {
    if (!this.props.fetching) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = ({ item }) => {
    return <ProductItem product={item} box={this.state.box} />;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={'Search the Web'}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          style={{ paddingHorizontal: 5 }}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          // onRefresh={() => this.props.getWebProducts(this.state.query)}
          // refreshing={this.props.refreshing}
          keyExtractor={(item, index) => index}
          data={this.props.products}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

SearchWeb.contextTypes = {
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles
};

const mapStateToProps = state => ({
  products: state.webproducts.payload,
  refreshing: !!state.webproducts.fetching,
});

const mapDispatchToProps = dispatch => ({
  getWebProducts: query => dispatch(WebProductsActions.webProductsRequest(query))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.webproducts.payload, next.webproducts.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(SearchWeb);
// export default connect(mapStateToProps, mapDispatchToProps)(SearchWeb);
