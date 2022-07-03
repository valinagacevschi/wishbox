import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './Styles/BoxItemActionBarStyle';
import { Colors, Icons } from '../Themes';

export default class BoxItemActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.buttonData = [
      { icon: 'like', scene: 'like' },
      { icon: 'comment', scene: 'comment' },
      { icon: 'share', scene: 'share' },
      { icon: 'save', scene: 'save' },
    ];
  }

  renderButton(b, i, noBorder) {
    const { icon, scene } = b;
    return (
      <TouchableOpacity style={{ flex: 1 }} key={i} onPress={() => this.props.onPress(scene)}>
        <View style={[styles.button, !noBorder && { borderRightWidth: 0.5 }]}>
          <Icons size={14} name={icon} color={Colors.wish} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.buttonData.map((b, i) => this.renderButton(b, i, i === this.buttonData.length - 1))}
      </View>
    );
  }
}
