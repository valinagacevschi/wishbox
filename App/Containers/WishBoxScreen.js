import React from 'react';
import { FlatList, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserBoxesActions from '../Redux/UserBoxesRedux';
import Header from '../Components/Header';
import OnlineLabel from '../Components/OnlineLabel';
import User from '../Components/User';
import SquareItem from '../Components/SquareItem';
import Spinner from '../Components/Spinner';
// Styles
import xstyles from './Styles/WishBoxScreenStyle';
import { Colors, Fonts } from '../Themes';

class WishBoxScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    const { box, boxId } = props.navigation.state.params || {};
    const { name, created, boxItems } = box || {};
    this.state = {
      boxId,
      title: name,
      created,
      data: boxItems,
      reload: false,
    };
    if (boxId) {
      props.getBox(boxId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.box) {
      const { name, created, boxItems, owner } = newProps.box;
      this.setState({
        title: name,
        created,
        data: boxItems,
        owner
      });
    }
  }

  handleOnNavigateBack = (param) => {
    this.props.getBox(param);
    this.setState({ reload: true });
  }

  renderItem = ({ item }) => {
    if (item.status === 'reject' || item.status === 'suggest') return null;
    return (
      <SquareItem
        boxItem={item}
        onPressItem={() => this.context.goTo('boxitem', { boxItem: item, onNavigateBack: this.handleOnNavigateBack })}
      />
    );
  }

  render() {
    const { title, created } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Header
          title={title || I18n.t('wishbox')}
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
        />
        {this.state.owner && (
          <View style={styles.profile}>
            <User image={this.state.owner.image} name={`${this.state.owner.name}`}>
              <OnlineLabel />
            </User>
          </View>
        )}
        {this.state.data && (
          <View style={styles.timeBox}>
            <Icon size={12} name="clock-o" color={Colors.panther} />
            <Text style={styles.timeText}>
              Wishbox date {moment(created).format('DD.MM.YYYY')}
            </Text>
          </View>
        )}
        {!this.state.data && <Spinner />}
        <FlatList
          // style={{ marginBottom: 0 }}
          // contentContainerStyle={[styles.grid]}
          contentContainerStyle={{ alignItems: 'center' }}
          columnWrapperStyle={{ alignItems: 'center', justifyContent: 'space-around' }}
          numColumns={2}
          keyExtractor={(item, index) => index}
          data={this.state.data}
          renderItem={this.renderItem}
          extraData={this.state.reload}
        />
      </View>
    );
  }
}

WishBoxScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles,
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    paddingVertical: 10,
    borderColor: 'rgba(210,210,210,0.6)',
    borderBottomWidth: 0.75
  },
  timeText: {
    marginLeft: 10,
    color: Colors.panther,
    fontSize: 12
  }
};

const mapStateToProps = state => ({
  box: state.userBoxes.selected,
  refreshing: !!state.userBoxes.fetching
});

const mapDispatchToProps = dispatch => ({
  getBox: id => dispatch(UserBoxesActions.userBoxRequest(id))
});

const areStatesEqual = (prev, next) => (
  prev.userBoxes.selected
  && next.userBoxes.selected
  && _.isEqual(prev.userBoxes.selected.boxItems, next.userBoxes.selected.boxItems)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(WishBoxScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(WishBoxScreen);
