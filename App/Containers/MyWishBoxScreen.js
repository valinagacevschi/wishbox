import React from 'react';
import { FlatList, View, Alert, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'; 
import MyBoxesActions from '../Redux/MyBoxesRedux';
import Header from '../Components/Header';
import SquareItem from '../Components/SquareItem';
import RoundedButton from '../Components/RoundedButton';
import WishBoxTab from '../Components/WishBoxTab';
import Tutorial from '../Components/Tutorial';
// Styles
import xstyles from './Styles/MyWishBoxScreenStyle';
import { Colors, Fonts, Images, Metrics } from '../Themes';

class MyWishBoxScreen extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: props => <WishBoxTab {...props} name="menu2" />
  });
  
  constructor(props) {
    super(props);
    const { box } = props.navigation.state.params;
    this.state = { box, reload: 0 };
  }

  componentDidMount() {
    this.props.selectBox(this.state.box);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.box) {
      this.setState({ box: newProps.box });
    }
  }

  onToggleStatus = () => {
    this.props.toggleBox(this.state.box.id);
  };

  onPressManage = () => {
    this.context.goTo('access', { box: this.state.box.id, name: this.state.box.name });
  };

  onPressDelete = () => {
    Alert.alert('Warning', `Are you sure you want to delete box ${this.state.box.name}`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          this.props.deleteBox(this.state.box.id);
          this.context.goBack();
        },
        style: 'destructive'
      }
    ]);
  };

  onDateChange = date => {
    this.props.setBoxDate(this.state.box.id, date);
  };

  handleOnNavigateBack = (param) => {
    this.props.myBoxes();
    this.setState({ reload: this.state.reload + 1 });
  }

  renderItem = ({ item }) => (
    <SquareItem
      boxItem={item}
      onPressItem={() => this.context.goTo('myboxitem', { boxItem: item, onNavigateBack: this.handleOnNavigateBack })}
    />
  );

  render() {
    const { name, private: isPrivate, date, boxItems } = this.state.box;
    const status = isPrivate ? 'public' : 'private';
    const makeLabel = `Make ${status.capitalizeFirstLetter()}`;
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.bgr} resizeMode="cover" style={styles.image} />
        <Header
          title={name}
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
          rightIcon={'add-item'}
          rightIconPress={() => this.context.goTo('search', { box: this.state.box })}
        />
        <View style={styles.eventDate}>
          <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            iconComponent={<Icon size={18} name="angle-down" color={Colors.panther} />}
            placeholder="Select box date"
            // format="YYYY-MM-DD"
            minDate="2017-05-01"
            maxDate="2018-05-01"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={styles.customPicker}
            onDateChange={this.onDateChange}
          />
        </View>
        {boxItems.length !== 0 && (
          <FlatList
            contentContainerStyle={styles.grid}
            refreshing={this.props.refreshing}
            onRefresh={() => this.props.myBoxes()}
            keyExtractor={(item, index) => index}
            data={boxItems}
            renderItem={this.renderItem}
            pageSize={20}
            extraData={this.state}
          />
        )}
        {boxItems.length === 0 && (
          <View style={styles.noItems}>
            <Text style={styles.noItemText}>
              Your wishbox is empty, tap the button below to start adding items.
            </Text>
            <RoundedButton
              text={'Add Item'}
              style={{ marginTop: 20, width: 150 }}
              onPress={() => this.context.goTo('search', { box: this.state.box })}
            />
          </View>
        )}
        <View style={{ height: isPrivate ? 125 : 60, padding: 5 }}>
          {isPrivate && (
            <RoundedButton
              text={'Manage Private Access'}
              style={{ marginHorizontal: 10 }}
              onPress={this.onPressManage}
            />
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <RoundedButton
              ok
              icon={status}
              text={makeLabel}
              style={[styles.button, styles.left]}
              onPress={this.onToggleStatus}
            />
            <RoundedButton
              cancel
              text={'Delete'}
              style={[styles.button, styles.right]}
              onPress={this.onPressDelete}
            />
          </View>
        </View>
        {!this.props.refreshing && <Tutorial route='mywishbox' />}
      </View>
    );
  }
}

MyWishBoxScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles,
  image: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  customPicker: {
    dateInput: {
      alignItems: 'center',
      borderColor: 'transparent'
    },
    dateText: {
      fontSize: 17,
      color: Colors.panther
    },
    placeholderText: {
      fontSize: 17,
      color: Colors.panther
    }
  },
  noItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  noItemText: {
    fontSize: 18,
    color: Colors.charcoal,
    textAlign: 'center',
    backgroundColor: Colors.transparent
  }
};

const mapStateToProps = state => ({
  box: state.myboxes.selected,
  refreshing: !!state.myboxes.fetching
});

const mapDispatchToProps = dispatch => ({
  myBoxes: () => dispatch(MyBoxesActions.myBoxesRequest()),
  deleteBox: id => dispatch(MyBoxesActions.myBoxesDelete(id)),
  selectBox: box => dispatch(MyBoxesActions.myBoxesSelect(box)),
  setBoxDate: (id, date) => dispatch(MyBoxesActions.myBoxesSetDate(id, date)),
  toggleBox: id => dispatch(MyBoxesActions.myBoxesToggle(id))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.myboxes.selected, next.myboxes.selected)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(MyWishBoxScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(MyWishBoxScreen);
