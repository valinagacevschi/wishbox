import React from 'react';
import { View, Image, Text, Platform, TextInput } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProfileActions from '../Redux/ProfileRedux';
import Header from '../Components/Header';
import ItemInput from '../Components/ItemInput';
import IconButton from '../Components/IconButton';
import Uploader from '../Services/Uploader';
import CamBar from '../Components/CamBar';
import ModalPicker from '../Components/ModalPicker';
// Styles
import xstyles from './Styles/ProfileScreenStyle';
import { Colors, Images, Icons, Metrics } from '../Themes';

const fields = [{
    name: 'first_name',
    label: 'First Name:',
    iconName: 'name-profile',
    iconColor: Colors.name,
    iconShade: Colors.nameB,
    ref: 'k1',
    next: 'k2',
    validType: 'text'
  }, {
    name: 'last_name',
    label: 'Last Name:',
    iconName: 'name-profile',
    iconColor: Colors.name,
    iconShade: Colors.nameB,
    ref: 'k2',
    next: 'k3',
    validType: 'text'
  }, {
    name: 'email',
    label: 'Email:',
    iconName: 'email-profile',
    iconColor: Colors.email,
    iconShade: Colors.emailB,
    ref: 'k3',
    next: 'k4',
    validType: 'email',
    keyboardType: 'email-address'
  }, {
    name: 'phone',
    label: 'Phone:',
    iconName: 'phone',
    iconColor: Colors.phone,
    iconShade: Colors.phoneB,
    ref: 'k4',
    next: 'k5',
    validType: 'phone',
    keyboardType: 'phone-pad'
  }];

const uploader = Uploader.create();

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: null,
      path: null,
      progress: null,
      id: null,
      url: null,
      complete: null,

      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      birthday: null,
      gender: null,
      password: null,
      image: '/assets/nophoto.png',
    };
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.profile) {
      this.setState({
        ...newProps.profile
      }, () => {
        if (!newProps.complete) {
          Toast.showWithGravity(
            'Incomplete Profile. Check the empty fields.',
            Toast.SHORT, Toast.CENTER);
        }
      });
    }
  }

  onSave = () => {
    this.props.saveProfile(this.state);
  }

  onRemoveImage = () => {
    this.setState({ image: '/assets/nophoto.png', path: null, progress: null, id: null, url: null });
  }

  onProgress = (data) => {
    this.setState({ progress: Math.round(data.progress) });
  }

  onError = () => {}

  onComplete = (data) => {
    const response = JSON.parse(data.responseBody);
    const { url, id } = response;
    const complete = true;
    this.setState({ id, url, complete, image: url });
  }


  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  addImage = (response) => {
    if (response.didCancel) {
      __DEV__ && console.log('User cancelled image picker');
    } else if (response.error) {
      __DEV__ && console.log('ImagePicker Error: ', response.error);
    } else {
      this.setState({
        pic: { uri: response.uri },
        path: { uri: response.path },
        progress: 0,
        id: -1,
        url: '',
        complete: false,
      });
      const image = Platform.OS === 'android' ? this.state.path : this.state.pic;
      uploader.upload(image.uri, image.data, 0,
        this.onProgress,
        this.onError,
        this.onComplete
      );
    }
  }

  renderInputCard = (field, i) => {
    const {
      name, label, iconName, iconColor, iconShade,
      validType, keyboardType, ref, next, secureTextEntry,
    } = field;
    return (
      <View style={styles.card} key={i}>
        <View style={[styles.icon, { backgroundColor: iconShade }]}>
          <Icons name={iconName} size={12} color={iconColor} />
        </View>
        <Text style={styles.label}>{label}</Text>
        <ItemInput
          label={label}
          validType={validType}
          keyboardType={keyboardType}
          value={this.state[name]}
          secureTextEntry={secureTextEntry}
          ref={ref}
          onChangeText={(text) => this.handleChange(name, text)}
          onSubmitEditing={() => this.refs[next] && this.refs[next].focus()}
        />
      </View>
    );
  }

  renderInputGender = () => {
    return (
      <View style={styles.card}>
        <View style={[styles.icon, { backgroundColor: Colors.genderB }]}>
          <Icons name="gender" size={12} color={Colors.gender} />
        </View>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.containerx}>
          <ModalPicker
            data={[{ key: 0, section: true, label: 'Select Gender' }, { key: 1, label: 'Male' }, { key: 2, label: 'Female' }]}
            onChange={(option) => this.setState({ gender: option.label })}
          >
            <TextInput
              style={styles.inputStyle}
              editable={false}
              placeholder="Select gender"
              underlineColorAndroid='transparent'
              placeholderTextColor={Colors.title}
              value={this.state.gender}
              onChangeText={(text) => this.handleChange('gender', text)}
            />
          </ModalPicker>
        </View>
      </View>
    );
  }

  renderInputDate = () => {
    return (
      <View style={styles.card}>
        <View style={[styles.icon, { backgroundColor: Colors.birthdayB }]}>
          <Icons name="birthday" size={12} color={Colors.birthday} />
        </View>
        <Text style={styles.label}>Birthday:</Text>
        <View style={styles.containerx}>
          <DatePicker
            style={styles.datePicker}
            date={this.state.birthday}
            mode="date"
            iconComponent={<Icon size={18} name='angle-down' color={Colors.panther} />}
            placeholder="Select box date"
            // minDate="1920-01-01"
            // maxDate="2005-01-01"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={styles.customPicker}
            onDateChange={(date) => this.setState({ birthday: date })}
          />
        </View>
      </View>
    );
  }

  render() {
    // if (!this.props.profile || this.props.fetching) return null;
    const image = this.state.image && `${window.fix(this.state.image)}?type=large`;
    const provider = this.props.profile && this.props.profile.provider;
    return (
      <View style={styles.mainContainer}>
        <Header
          title={I18n.t('profile')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
          rightButton
          rightBtnText='Save'
          rightBtnPress={() => this.props.saveProfile(this.state)}
        />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{ justifyContent: 'center', paddingBottom: 60 }}
        >
          <View style={styles.header}>
            <Image resizeMode='cover' style={styles.topBgr} source={Images.customBgr} />
            <View style={{ alignItems: 'center' }}>
              <CachedImage 
                source={this.state.pic || { uri: image, cache: 'force-cache' }} 
                style={styles.image} 
              />
              <IconButton
                icon='closed'
                color={Colors.snow}
                bgColor={Colors.fire}
                size={6}
                style={{ marginTop: -10 }}
                onPress={this.onRemoveImage}
              />
              <CamBar search={false} style={styles.camBarStyle} onImageReady={this.addImage} />
            </View>
          </View>
          <View style={styles.form}>
            <ModalPicker
              ref='modal1'
              cancelText={I18n.t('cancel')}
              data={[{ key: 0, section: true, label: 'Select Box' }, ...(this.state.boxes || [])]}
              selectStyle={{ height: 0, padding: 0, borderWidth: 0 }}
              onChange={(option) => this.onChangeItem(option)}
            />
            {fields.map((item, i) => this.renderInputCard(item, i))}
            {this.renderInputDate()}
            {this.renderInputGender()}
            {provider && provider !== 'facebook' && this.renderInputCard({
              name: 'password',
              label: 'Password:',
              iconName: 'password',
              iconColor: Colors.password,
              iconShade: Colors.passwordB,
              secureTextEntry: true,
              ref: 'k7',
              next: 'k7',
              validType: 'text'
            }, -1)}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  containerx: {
    flex: 1,
    borderColor: Colors.title,
    borderBottomWidth: 0.95,
    marginVertical: Metrics.baseMargin,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: 'normal',
    height: 28,
    paddingVertical: Platform.OS === 'ios' ? 'auto' : 0,
  },
  datePicker: {
    width: 'auto',
  },
  customPicker: {
    dateInput: {
      alignItems: 'flex-start',
      borderColor: 'transparent',
    },
    dateText: {
      fontSize: 14.5,
      textAlign: 'left',
      color: Colors.coal,
    },
    placeholderText: {
      fontSize: 14.5,
      color: Colors.steel
    }
  }
};

Profile.contextTypes = {
  goBack: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
  fetching: state.profile.fetching,
  complete: state.profile.complete,
  profile: state.profile.payload,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(ProfileActions.profileRequest()),
  saveProfile: (profile) => dispatch(ProfileActions.profileSave(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
