import React from 'react';
import { View, Animated, Platform, TouchableOpacity } from 'react-native';
import styles from './Styles/CalloutStyle';
import { Metrics } from '../Themes/';

export default class Callout extends React.Component {
  constructor(props) {
    super(props);
    const { top, bottom } = props;
    this.state = {
      tutorialOn: true,
      top: top && new Animated.Value(Metrics.screenHeight + 200),
      bottom: bottom && new Animated.Value(Metrics.screenHeight + 200),
      hide: false,
    };
  }

  componentDidMount() {
    const { top, bottom } = this.props;
    top && Animated.timing(
      this.state.top, {
        toValue: Platform.OS === 'ios' ? top : top - 20,
        duration: 2000,
      }).start();
    bottom && Animated.timing(
      this.state.bottom, {
        toValue: bottom,
        duration: 2000,
      }).start();
  }

  onPress = () => {
    this.setState({ hide: true });
  }

  render() {
    const { top, bottom, hide } = this.state;
    if (hide) {
      return null;
    }
    const { opacity, up, right: marginRight } = this.props;
    return (
      <Animated.View style={[styles.container, { left: 10, opacity, top, bottom }]}>
        <TouchableOpacity onPress={this.onPress}>
          {up && <View style={[styles.triangle, { marginRight }]} />}
          <View style={styles.square}>
            {this.props.children}
          </View>
          {!up && <View style={[styles.triangle, { marginRight }, styles.triangleDown]} />}
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
