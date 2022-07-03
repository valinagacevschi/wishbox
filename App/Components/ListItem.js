import React from 'react';
import { View, Text } from 'react-native';
//  import moment from 'moment';
import xstyles from './Styles/BoxStyle';
import { Colors, Icons, Metrics } from '../Themes/';

export default class ListItem extends React.Component {
  render() {
    const { dark, item } = this.props;
    const { name, details } = item;
    const textColor = dark ? Colors.coal : Colors.coal;
    const bulletColor = dark ? Colors.background : Colors.snow;
    const itemColor = dark ? Colors.backgroundT : Colors.backgroundT;
    return (
      <View style={[styles.boxItem, dark && styles.dark]}>
        <View>
          <View style={[styles.iconbox, { backgroundColor: bulletColor }]}>
            <Icons name="menu2" size={28} color={dark ? Colors.steel : Colors.background} />
          </View>
        </View>
        <View style={styles.textbox}>
          <View>
            <Text style={[styles.text, { color: textColor }]}>{name}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={[{ fontSize: 12, color: itemColor, paddingVertical: 5 }]}>{details}</Text>
          </View>
        </View>
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  boxItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    borderBottomWidth: 0.75,
    borderColor: 'rgba(120,120,120,0.3)',
    width: Metrics.screenWidth,
    alignItems: 'center',
  },
  dark: {
  },
  iconbox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
  lock: {
    position: 'absolute',
    right: 3,
    bottom: 3,
    backgroundColor: 'transparent'
  },
  textbox: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: Metrics.doubleBaseMargin
  },
  textRow: {
    flexDirection: 'row'
  },
  iconText: {
    marginHorizontal: 8,
    fontSize: 10.5
  },
  text: {
    fontSize: 18
  },
  badge: {
    position: 'absolute',
    top: 3,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 0.75,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    backgroundColor: Colors.transparent
  }  
};
