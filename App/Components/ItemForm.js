import React from 'react';
import { View, Text } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

import ItemInput from '../Components/ItemInput';
import styles from './Styles/ItemFormStyle';
import { Colors } from '../Themes';

export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    // const { name, description, note, price, currency, store } = props.fields || {};
    this.state = {
      ...(props.fields || { currency: 'LEI' }),
    };
  }

  onSelect = (index, value) => {
    const newState = { ...this.state, currency: value };
    this.setState(newState);
    this.props.onChange(newState);
  }

  handleChangeName = (value) => {
    const newState = { ...this.state, name: value };
    this.setState(newState);
    this.props.onChange(newState);
  }

  handleChangeDescription = (value) => {
    const newState = { ...this.state, description: value };
    this.setState(newState);
    this.props.onChange(newState);
  }

  handleChangePrice = (value) => {
    const newState = { ...this.state, price: value };
    this.setState(newState);
    this.props.onChange(newState);
  }

  // handleChangeNote = (value) => {
  //   const newState = { ...this.state, note: value };
  //   this.setState(newState);
  //   this.props.onChange(newState);
  // }

  // handleChangeStore = (value) => {
  //   const newState = { ...this.state, store: value };
  //   this.setState(newState);
  //   this.props.onChange(newState);
  // }

  render() {
    return (
      <View style={[styles.form, this.props.formStyle]}>
        <View style={styles.row}>
          <ItemInput
            editable={this.props.enabled}
            label="Name:"
            value={this.state.name}
            ref='k1'
            validType='text'
            onChangeText={this.handleChangeName}
            onSubmitEditing={() => this.refs.k2.focus()}
          />
        </View>
        <View style={styles.row}>
          <ItemInput
            editable={this.props.enabled}
            // autogrow
            // multiline
            label="Description:"
            value={this.state.description}
            ref='k2'
            validType='text'
            onChangeText={this.handleChangeDescription}
            onSubmitEditing={() => this.refs.k3.focus()}
          />
        </View>
        {/* <View style={styles.row}>
          <ItemInput
            editable={this.props.enabled}
            label="User's Note:"
            value={this.state.note}
            ref='k3'
            validType='text'
            onChangeText={this.handleChangeNote}
            onSubmitEditing={() => this.refs.k4.focus()}
          />
        </View> */}
        <View style={styles.row}>
          <ItemInput
            editable={this.props.enabled}
            label="Price:"
            value={this.state.price}
            ref='k3'
            validType='number'
            keyboardType='numeric'
            onChangeText={this.handleChangePrice}
            // onSubmitEditing={() => this.refs.k5.focus()}
          />
        </View>
        {/*<Text style={styles.label}>Currency:</Text>*/}
        <RadioGroup
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          color={Colors.title}
          selectedIndex={0}
          activeColor={Colors.wish}
          onSelect={(index, value) => this.onSelect(index, value)}
        >
          <RadioButton disabled={!this.props.enabled} value={'LEI'}>
            <Text style={styles.curr}>LEI</Text>
          </RadioButton>

          <RadioButton disabled={!this.props.enabled} value={'EUR'}>
            <Text style={styles.curr}>EUR</Text>
          </RadioButton>

          <RadioButton disabled={!this.props.enabled} value={'USD'}>
            <Text style={styles.curr}>USD</Text>
          </RadioButton>

          <RadioButton disabled={!this.props.enabled} value={'GBP'}>
            <Text style={styles.curr}>GBP</Text>
          </RadioButton>
        </RadioGroup>
        {this.props.children}
      </View>
    );
  }
}
