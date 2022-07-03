import React from 'react';
import { View, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MyBoxesActions from '../Redux/MyBoxesRedux';
import Header from '../Components/Header';
import BoxBar from '../Components/BoxBar';
import RoundedButton from '../Components/RoundedButton';
import Tutorial from '../Components/Tutorial';
// Styles
import xstyles from './Styles/AddBoxScreenStyle';
import { Colors, Fonts, Metrics, Images } from '../Themes';

class AddBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      date: null
    };
  }

  onCreate = () => {
    const { name, date } = this.state;
    this.props.create(name, date);
    this.setState({ name: null, date: null });
    this.context.goBack();
  }

  render() {
    const disabled = !this.state.name;
    return (
      <View style={styles.mainContainer}>
        <Image 
          source={Images.bgr} 
          resizeMode="cover" 
          style={styles.image} 
        />
        <Header
          title={'New Wishbox'}
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
        />

        <View style={styles.boxBar}>
          <BoxBar
            autoCorrect={false}
            handleChangeText={name => this.setState({ name })}
            ref={ref => (this.boxBar = ref)}
            returnKeyType='done'
          />
        </View>
        <View style={styles.eventDate}>
          <DatePicker
            style={styles.datePicker}
            date={this.state.date}
            mode="date"
            iconComponent={<Icon size={18} name="angle-down" color={Colors.panther} />}
            placeholder="Select box date"
            // format="YYYY-MM-DD"
            minDate="2017-09-01"
            // maxDate="2020-05-01"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={styles.customPicker}
            onDateChange={date => this.setState({ date })}
          />
        </View>

        <View style={styles.buttonBar}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <RoundedButton
              cancel
              text={'Cancel'}
              style={[styles.button, styles.left]}
              onPress={() => this.context.goBack()}
            />
            <RoundedButton
              disabled={disabled}
              text={'Create'}
              style={[styles.button, styles.right]}
              onPress={this.onCreate}
            />
          </View>
        </View>
        {<Tutorial route='addbox' />}
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  image: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  boxBar: {
    paddingVertical: 4,
    backgroundColor: Colors.snow,
    borderBottomWidth: 0.7,
    borderColor: Colors.silver
  },
  buttonBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    padding: 5
    // borderWidth: 1,
    // borderColor: 'red'
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin
  },
  left: {
    marginRight: 5
  },
  right: {
    marginLeft: 5
  },
  eventDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    paddingHorizontal: 5
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
  }
};

AddBox.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  create: (name, date) => dispatch(MyBoxesActions.myBoxesCreate(name, date))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBox);
