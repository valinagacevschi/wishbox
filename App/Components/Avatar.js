import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import I18n from 'react-native-i18n';
import User from './User';
import OnlineLabel from './OnlineLabel';
import styles from './Styles/AvatarStyle';
import { Colors } from '../Themes';

export default class Avatar extends React.Component {
  renderUnfriend = () => (
    <TouchableOpacity
      style={[styles.unFriend, { borderColor: 'red', borderWidth: 1 }]}
      onPress={() => this.props.onPressUnfriend()}
    >
      <Text style={styles.unText}>Unfriend</Text>
    </TouchableOpacity>
  );

  renderInvite = () => (
    <TouchableOpacity style={styles.invite} onPress={() => this.props.onPressInvite()}>
      <Text style={styles.inText}>Invite</Text>
    </TouchableOpacity>
  );

  renderClose = seq => (
    <Icon.Button
      name="close"
      size={12}
      borderRadius={20}
      iconStyle={{ marginRight: -1, width: 12, height: 12, marginLeft: 1 }}
      backgroundColor={Colors.fire}
      onPress={seq === 'requests' ? this.props.onPressRefuse : this.props.onPressCancel}
    />
  );

  renderTools(seq) {
    const invites = seq === 'Invited';
    const unknown = seq === 'unknown';
    const friend = seq === 'friend';
    const close = seq === 'Received' || seq === 'Sent' || seq === 'Invited';
    const ok = seq === 'Received';
    return (
      <View style={styles.mainContainer}>
        {ok && (
          <Icon.Button
            name="check"
            size={12}
            borderRadius={20}
            iconStyle={{ marginRight: 0, width: 12, height: 12 }}
            backgroundColor={Colors.wish}
            onPress={() => this.props.onPressAccept()}
          />
        )}
        {invites && (
          <Icon.Button
            name="refresh"
            size={12}
            borderRadius={20}
            iconStyle={{ marginRight: 0, width: 12, height: 12 }}
            backgroundColor={Colors.wish}
            onPress={() => this.props.onPressRefresh()}
          />
        )}
        <View style={{ width: 10 }} />
        {close && this.renderClose(seq)}
        {unknown && this.renderInvite()}
        {friend && this.renderUnfriend()}
      </View>
    );
  }

  render() {
    const friend = this.props.section === 'friend';
    const { name, image, id } = this.props.user;
    return (
      <TouchableOpacity onPress={() => friend && this.props.onPressOwner && this.props.onPressOwner()}>
        <View style={styles.container}>
          <User id={id} image={image} name={name}>
            {friend && <OnlineLabel />}
          </User>
          {this.renderTools(this.props.section)}
        </View>
      </TouchableOpacity>
    );
  }
}
