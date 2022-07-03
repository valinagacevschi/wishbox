import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash'; 
import MyBoxesActions from '../Redux/MyBoxesRedux';
import Header from '../Components/Header';
import Box from '../Components/Box';
import RoundedButton from '../Components/RoundedButton';
import WishBoxTab from '../Components/WishBoxTab';
import Tutorial from '../Components/Tutorial';

// Styles
import xstyles from './Styles/WishboxListScreenStyle';
import { Colors, Fonts, Metrics } from '../Themes';

class MyWishboxList extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: props => <WishBoxTab {...props} name="menu2" />
  });

  componentDidMount() {
    this.props.myBoxes();
  }

  selectBox = (box) => {
    this.context.goTo('mywishbox', { box });
  }

  renderItem = ({ item }) => {
    const suggested = item.boxItems.reduce((acc, itm) => (
      itm.status === 'suggest' ? acc + 1 : acc
    ), 0);
    return (
      <View>
        <TouchableOpacity onPress={() => this.selectBox(item)}>
          <Box mine item={item} suggested={suggested} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={'My Wishboxes'}
          leftIcon={'wishbox-logo'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.h3}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          style={{ marginBottom: 0 }}
          refreshing={this.props.refreshing}
          onRefresh={() => this.props.myBoxes()}
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          data={this.props.myboxes}
          renderItem={this.renderItem}
        />
        <View style={styles.buttonWrap}>
          <RoundedButton
            text={'Add Wishbox'}
            style={styles.button}
            onPress={() => this.context.goTo('addbox')}
          />
        </View>
        {!this.props.refreshing && <Tutorial route='mywishlist' />}
      </View>
    );
  }
}

MyWishboxList.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles,
  profile: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    paddingVertical: 15,
    paddingHorizontal: Metrics.baseMargin
  },
  grid: {},
  buttonWrap: {
    flexDirection: 'row'
    //justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin
  }
};

const mapStateToProps = state => ({
  myboxes: state.myboxes.payload,
  refreshing: !!state.myboxes.fetching
});

const mapDispatchToProps = dispatch => ({
  myBoxes: () => dispatch(MyBoxesActions.myBoxesRequest()),
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.myboxes.payload, next.myboxes.payload) 
); 

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(MyWishboxList);
