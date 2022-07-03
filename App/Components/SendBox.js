import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
// import I18n from 'react-native-i18n';
import styles from './Styles/SendBoxStyle';
import { Colors, Icons } from '../Themes';

export default class SendBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textValue: '' };
  }

  onPressButton = () => {
    this.textInput.setNativeProps({ text: '' });
    this.props.onSend(this.state.textValue);
  }

  onChange = (event) => {
    this.setState({ textValue: event.nativeEvent.text || '' });
  }

  render() {
    return (
      <View style={[styles.sendBox, this.props.style]}>
        <AutoGrowingTextInput
          style={styles.textInput}
          placeholder={this.props.prompt || 'Your comment'}
          value={this.state.textValue}
          blurOnSubmit
          onChange={this.onChange}
          onSubmitEditing={this.onPressButton}
          maxHeight={200}
          underlineColorAndroid={Colors.transparent}
          ref={(r) => { this.textInput = r; }}
        />
        <TouchableOpacity disabled={!this.state.textValue} onPress={this.onPressButton}>
          <View style={styles.button}>
            <Icons size={18} name='send' color={Colors.wish} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
