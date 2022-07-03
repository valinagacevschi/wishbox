import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// const INITIAL_TOP = Platform.OS === 'ios' ? -80 : -60;

export default class BoxBar extends Component {
  static defaultProps = {
    placeholder: 'Type wishbox name:',
    placeholderTextColor: 'lightgray',
    focusOnLayout: false,
    autoCapitalize: 'sentences',
    allDataOnEmptySearch: true
  };

  constructor(props) {
    super(props);
    this.state = {
      input: props.input || '',
      show: true
    };
  }

  onChangeText = input => {
    const { handleChangeText } = this.props;
    this.setState({ input });
    if (handleChangeText) {
      handleChangeText(input);
    }
  };

  getValue = () => this.state.input;

  clearInput = () => {
    this.setState({ input: '' });
    this.onChangeText('');
    this.props.onCancel && this.props.onCancel();
  };

  render = () => {
    const { placeholder, onSubmitEditing, onFocus, focusOnLayout, returnKeyType } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          ref={ref => (this.textInput = ref)}
          onLayout={() => focusOnLayout && this.textInput.focus()}
          style={styles.input}
          onChangeText={this.onChangeText}
          onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
          onFocus={() => onFocus && onFocus()}
          placeholder={placeholder}
          value={this.state.input}
          underlineColorAndroid="transparent"
          returnKeyType={returnKeyType || 'search'}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={this.state.input === '' ? null : this.clearInput}>
          <Icon
            name={'close'}
            size={15}
            style={{ padding: 7, color: this.state.input === '' ? 'white' : 'black' }}
          />
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: 'rgba(200,200,200,0.75)',
    borderWidth: 0.75,
    borderRadius: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    ...Platform.select({
      ios: { height: 24 },
      android: { height: 44 }
    }),
    paddingTop: 5,
    width: Dimensions.get('window').width - 80,
    marginLeft: 5,
    fontSize: 16
  }
  // navWrapper: {
  //   width: Dimensions.get('window').width,
  // },
  // nav: {
  //   flex: 1,
  //   flexBasis: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  // },
});
