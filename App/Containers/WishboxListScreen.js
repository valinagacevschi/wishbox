import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import UserBoxesActions from '../Redux/UserBoxesRedux';
import Header from '../Components/Header';
import OnlineLabel from '../Components/OnlineLabel';
import User from '../Components/User';
import Box from '../Components/Box';
import Spinner from '../Components/Spinner';

// Styles
import xstyles from './Styles/WishboxListScreenStyle';
import { Colors, Fonts, Metrics } from '../Themes';

class WishboxList extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.navigation.state.params.user;
  }

  componentDidMount() {
    this.props.userBoxes(this.user.id);
  }

  selectBox = box => {
    this.props.userSelect(box);
    this.context.goTo('wishbox', { box, user: this.user });
  };

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={this.selectBox.bind(this, item)}>
        <Box item={item} mine={false} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { name, image } = this.user || {};
    return (
      <View style={styles.mainContainer}>
        <Header
          title={'Wishboxes'}
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
        />
        {this.user && (
          <View style={styles.profile}>
            <User image={window.fix(image)} name={`${name}`}>
              <OnlineLabel />
            </User>
          </View>
        )}
        {!this.props.boxes && <Spinner />}
        <FlatList
          style={styles.flat}
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          data={this.props.boxes}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

WishboxList.contextTypes = {
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
  flat: {
    marginBottom: 0
  },
  grid: {},
  buttonWrap: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin
  }
};

const mapStateToProps = state => ({
  boxes: state.userBoxes.payload
});

const mapDispatchToProps = dispatch => ({
  userBoxes: id => dispatch(UserBoxesActions.userBoxesRequest(id)),
  userSelect: box => dispatch(UserBoxesActions.userBoxesSelect(box))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.userBoxes.payload, next.userBoxes.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(WishboxList);
// export default connect(mapStateToProps, mapDispatchToProps)(WishboxList);
