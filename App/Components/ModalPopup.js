import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/ModalPopupStyle';
import { Colors } from '../Themes';

export default class ModalPopup extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.modalOpen !== this.props.modalOpen) {
      if (nextProps.modalOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  open = () => this.refs.modal.open();

  close = () => this.refs.modal.close();

  render() {
    return (
      <Modal ref='modal' style={[styles.modal, this.props.style]} swipeToClose >
        <View style={styles.innerModal}>
          {this.props.children}
        </View>
        <View style={{ position: 'absolute', right: 5, top: 10 }}>
          <Icon.Button
            name='close'
            color={Colors.snow}
            iconStyle={styles.iconStyle}
            //borderRadius={20}
            size={18}
            backgroundColor={'rgba(200,200,200,0)'}
            onPress={this.close}
          />
        </View>
      </Modal>
    );
  }
}
