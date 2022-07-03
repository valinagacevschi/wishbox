// @flow

import React from 'react';
import {
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  Text,
  Platform,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import I18n from 'react-native-i18n';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import _ from 'lodash';

import FeedActions from '../Redux/FeedRedux';
import ProductsActions from '../Redux/ProductsRedux';
import Header from '../Components/Header';
import BoxItem from '../Components/BoxItem';
import FeaturedList from '../Components/FeaturedList';
import ModalPicker from '../Components/ModalPicker';
import Tutorial from '../Components/Tutorial';
// import { tutorial } from '../Config';

import { Colors } from '../Themes';
// Styles
import styles from './Styles/HomeScreenStyle';

const FILTER = ['all', 'public', 'private'];

const tracker = new GoogleAnalyticsTracker('UA-108847800-1');

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstItem: (props.feed || [])[0],
      data: (props.feed || []).slice(1),
      selectedIndex: 0
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') SplashScreen.hide();
    this.complete = true;
    if (!this.props.isLoggedIn) {
      // this.context.reset('login');
      this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'login' })]
        })
      );
    // } else if (this.props.tutorialOn) {
    //   setTimeout(() => {
    //     this.context.goTo('tutorial', tutorial.home);
    //   }, 1200);
    } else {
      tracker.setUser(this.props.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.complete && !newProps.complete) {
      this.complete = false;
      // setTimeout(() => {
      //   if (false && !that.props.complete) this.context.goTo('profile');
      // }, 6500);
    }
    if (newProps.feed) {
      this.setState({
        firstItem: newProps.feed[0],
        data: newProps.feed.slice(1)
      });
    }
  }

  onChangeItem(box) {
    this.refs.modal.close();
    this.props.productAdd({ id: box.key, product_id: box.input });
  }

  onPressSave = (productId) => {
    if (this.props.boxes) {
      if (this.props.boxes.length === 1) {
        const box = this.props.boxes[0];
        Alert.alert('', `Add item to ${box.label} box ?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => this.props.productAdd({ id: box.key, product_id: productId })
          }
        ]);
      } else {
        this.refs.modal.open(productId);
      }
    }
  }

  handleIndexChange = index => {
    this.setState({ ...this.state, selectedIndex: index });
    this.props.loadFeed(FILTER[index]);
  };

  renderRefresh() {
    const { fetching, loadFeed } = this.props;
    return (
      <RefreshControl
        refreshing={fetching || false}
        onRefresh={() => loadFeed(FILTER[this.state.selectedIndex])}
      />
    );
  }

  renderItem = ({ item }) => 
    (<BoxItem boxItem={item} onPressSave={this.onPressSave} />);

  render() {
    if (!this.props.isLoggedIn) {
      return null;
    }
    const backgroundColor = '#f8f8f8';
    const opacity = 1;
    return (
      <View style={[styles.mainContainer, { backgroundColor }]}>
        <Header
          title={I18n.t('feed')}
          leftIcon={'wishbox-logo'}
          leftIconColor={Colors.wish}
          rightIcon={'add-item'}
          rightIconPress={() => this.context.goTo('search')}
        />
        <ScrollView style={[styles.container, { opacity }]} refreshControl={this.renderRefresh()}>
          <View style={{ margin: 10 }}>
            <SegmentedControlTab
              activeTabStyle={{ backgroundColor: Colors.wish, borderColor: Colors.wish }}
              tabStyle={{ backgroundColor: Colors.snow, borderColor: Colors.snow }}
              values={['All posts', 'Public only', 'Private only']}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
            />
          </View>
          {this.renderItem({ item: this.state.firstItem })}
          <Text style={styles.label}>{I18n.t('featured')}</Text>
          <FeaturedList />
          <FlatList
            contentContainerStyle={[styles.listContent, { paddingBottom: 50 }]}
            keyExtractor={(item, index) => index}
            data={this.state.data}
            renderItem={this.renderItem}
          />
          {this.props.boxes &&
          this.props.boxes.length > 1 && (
            <ModalPicker
              ref="modal"
              cancelText={I18n.t('cancel')}
              data={[{ key: 0, section: true, label: 'Select Box' }, ...this.props.boxes]}
              selectStyle={{ height: 0, padding: 0, borderWidth: 0 }}
              onChange={option => this.onChangeItem(option)}
            />
          )}
        </ScrollView>
        {true && !this.props.fetching && <Tutorial route='home' />}
      </View>
    );
  }
}

HomeScreen.contextTypes = {
  goTo: React.PropTypes.func,
  reset: React.PropTypes.func
};

const mapStateToProps = state => ({
  // firstTime: state.login.firstTime,
  isLoggedIn: state.login.user !== null,
  id: state.login.user && state.login.user.id,
  feed: state.feed.payload,
  fetching: state.feed.fetching,
  complete: state.profile.complete,
  boxes: state.myboxes.payload && state.myboxes.payload.map(b => ({ key: b.id, label: b.name })),
  tutorialOn: state.profile.tutorialOn,
});

const mapDispatchToProps = dispatch => ({
  
  loadFeed: filter => dispatch(FeedActions.feedRequest(filter)),
  productAdd: data => dispatch(ProductsActions.productAdd(data))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.feed.payload, next.feed.payload)
  && prev.profile.tutorialOn === next.profile.tutorialOn
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(HomeScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
