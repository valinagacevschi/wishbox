import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { debounce } from 'lodash/function';
import styles from './Styles/RoundedInputStyle';

export default class RoundedInput extends React.Component {
  static defaultProps = {
    // data: [],
    placeholder: 'Wishbox name',
    focusOnLayout: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      input: props.value || '',
      show: true,
    };
  }

  onChangeText = (input) => {
    this.setState({ input });
    this.props.onChangeText && this.props.onChangeText(input);
  }

  getValue = () => this.state.input;

  clearInput = () => {
    this.setState({ input: '' });
    this.onChangeText('');
  }

  render() {
    // const { placeholder } = this.props;
    return (
      <View style={styles.containers}>
        <TextInput
          {...this.props}
          ref={(ref) => (this.textInput = ref)}
          style={styles.input}
          onChangeText={this.onChangeText}
          onSubmitEditing={(event) => this.props.onSubmit(event.nativeEvent.text)}
          // placeholder={placeholder}
          value={this.state.input}
          underlineColorAndroid='transparent'
          returnKeyType={this.props.returnKeyType || 'send'}
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={this.state.input === '' ? null : this.clearInput}
        >
          <Icon
            name={'close'}
            size={15}
            style={[styles.clear, { color: this.state.input === '' ? 'white' : 'black' }]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
