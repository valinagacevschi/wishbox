import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import xstyles from './Styles/BoxStyle';
import { Colors, Icons, Metrics } from '../Themes/';

export default class Box extends React.PureComponent {
  render() {
    const { suggested, dark, mine, item } = this.props;
    const { name, date, boxItems, private: priv } = item;
    let count = boxItems.length;
    if (!mine) {
      count = boxItems.filter(itm => itm.status !== 'reject' && itm.status !== 'suggest').length;
    }

    const textColor = dark ? Colors.coal : Colors.coal;
    const grey = dark ? Colors.panther : Colors.panther;
    const bulletColor = dark ? Colors.background : Colors.snow;
    const itemColor = dark ? Colors.backgroundT : Colors.backgroundT;
    return (
      <View style={[styles.boxItem, dark && styles.dark]}>
        <View>
          <View style={[styles.iconbox, { backgroundColor: bulletColor }]}>
            <Icons name="menu2" size={28} color={dark ? Colors.steel : Colors.background} />
          </View>
          <Icons
            size={18}
            name={priv ? 'private' : 'public'}
            color={priv ? Colors.fire : Colors.wish}
            style={styles.lock}
          />
          {suggested > 0 && <View style={styles.badge}>
            <Text style={styles.badgeText}>{suggested}</Text>
          </View>}

        </View>
        <View style={styles.textbox}>
          <View>
            <Text style={[styles.text, { color: textColor }]}>{name}</Text>
          </View>

          <View style={styles.textRow}>
            <Icons size={12} name={'open'} color={itemColor} />
            <Text style={[styles.iconText, { fontSize: 12, color: itemColor }]}>{count} items</Text>
          </View>

          {date && (
            <View style={styles.textRow}>
              {this.props.name && (
                <View style={styles.textRow}>
                  <Icons size={12} name={'menu2'} color={grey} />
                  <Text style={[styles.iconText, { color: grey }]}>{this.props.name}</Text>
                </View>
              )}
              <View style={styles.textRow}>
                <Icon size={12} name="clock-o" color={grey} />
                <Text style={[styles.iconText, { color: grey }]}>
                  {moment(date).format('DD.MM.YYYY')}
                </Text>
              </View>
            </View>
          )}
        </View>
        <Icons size={18} name={'arrow'} color={Colors.coal} style={styles.carret} />
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
    // marginLeft: Metrics.doubleBaseMargin,
    width: Metrics.screenWidth
  },
  dark: {
    //borderColor: 'rgba(230,230,230,0.5)',
    // backgroundColor: Colors.snow
  },
  iconbox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: 'rgba(80,80,80,0.3)',
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
  carret: {
    alignSelf: 'center',
    marginRight: 5
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
