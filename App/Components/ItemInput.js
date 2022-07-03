import React from 'react';
import { View, Text, TextInput } from 'react-native';
import I18n from 'react-native-i18n';
import BaseInput from './BaseInput';
import styles from './Styles/ItemInputStyle';
import { Colors } from '../Themes';

export default class ItemInput extends BaseInput {
  validates = {
    text: value => value && value.length > 2,
    email: value => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value);
    },
    phone: value => {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return re.test(value);
    },
    date: value => {
      const re = /^\d{4}-\d{2}-\d{2}$/;
      return re.test(value);
    },
    gender: value => value && (value.lowercase() === 'male' || value.lowercase() === 'female'),
    number: value => !isNaN(value)
  };

  error = () => {
    if (this.state.error) {
      return <Text style={[styles.error, this.props.errorStyle]}>{this.state.error}</Text>;
    }
    return null;
  };

  onBlur = e => {
    const value = e.nativeEvent.text || this.props.value;
    const msg = this.validates[this.props.validType](value)
      ? ''
      : I18n.t(`invalid_${this.props.validType}`);
    this.setState({ error: msg });
  };

  render() {
    const {
      editable,
      showLabel,
      label,
      autogrow,
      multiline,
      numberOfLines,
      secureTextEntry,
      keyboardType,
      value,
      hidePlaceholder,
      placeholder,
      returnKeyType,
      onChangeText,
      onSubmitEditing,
    } = this.props;
    return (
      <View style={styles.container}>
        {showLabel && <Text style={styles.labelStyle}>{label}</Text>}
        <TextInput
          ref="input"
          editable={editable}
          autogrow={autogrow}
          multiline={multiline}
          numberOfLines={numberOfLines || 1}
          secureTextEntry={secureTextEntry}
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={keyboardType || 'default'}
          underlineColorAndroid="transparent"
          value={value}
          placeholder={
            !hidePlaceholder &&
            (placeholder || `Type ${label.toLowerCase()}`)
          }
          placeholderTextColor={Colors.title}
          style={styles.inputStyle}
          returnKeyType={returnKeyType || 'next'}
          onBlur={this.onBlur}
          onFocus={() => this.setState({ error: null })}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        {this.error()}
      </View>
    );
  }
}
