import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import BoxItemActions from '../Redux/BoxItemRedux';
import BarLike from './BarLike';
import BoxItemActionBar from '../Components/BoxItemActionBar';

import styles from './Styles/BoxItemStyle';
import { Colors, Icons, Images } from '../Themes';

class BoxItem extends React.Component {
  onPressUser = () => {
    this.context.goTo('wishlist', { user: this.props.boxItem.owner });
  };

  onPressProd = () => {
    this.context.goTo('boxitem', { boxItem: this.props.boxItem });
  };

  onPressButton = command => {
    if (command === 'like') {
      this.props.addLike(this.props.boxItem.id, !this.isLiked());
    } else if (command === 'comment') {
      this.context.goTo('boxitem', { boxItem: this.props.boxItem, scroll: 'end' });
    } else if (command === 'share') {
      this.context.goTo('suggest', { product: this.props.boxItem.product });
    } else if (command === 'save') {
      this.props.onPressSave(this.props.boxItem.product.id);
    } else {
      Alert.alert('Alert', `onPressButton: ${command}`, [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
    }
  };

  getCaption = boxItem => {
    const { owner, boxName, timeDate, suggester } = boxItem;
    let line = `${owner.name} added this item to ${boxName} box`;
    let time = timeDate;
    if (suggester) {
      time = suggester.time;
      if (suggester.action === 'suggested') {
        line = `${suggester.name} suggested this to ${owner.name}'s' ${boxName} box `;
      } else if (suggester.action === 'commented') {
        line = `${suggester.name} commented on ${owner.name}'s' gift in ${boxName} box`;
      } else if (suggester.action === 'liked') {
        line = `${suggester.name} likes ${owner.name}'s' gift in ${boxName} box`;
      } else {
        __DEV__ && console.log(`PANIC: suggester action=${suggester.action}`);
      }
    }
    return { line, time };
  };

  isLiked = () => [...this.props.boxItem.liked.map(l => l.id)].indexOf(this.props.myId) >= 0;

  icon = (status, subscriptionType) => {
    if (status === 'open') {
      return 'unreserve';
    } else if (status === 'subscribed') {
      if (subscriptionType === 'split') {
        return 'split';
      } 
      return 'private';
    } else if (status === 'purchased') {
      return 'purchased';
    } else if (status === 'received') {
      return 'got-it';
    }
    return 'open';
  };

  render() {
    if (!this.props.boxItem) return null;
    const {
      boxId,
      owner,
      product,
      liked,
      likes,
      comments,
      boxesNo,
      status,
      subscriptionType
    } = this.props.boxItem;
    const { line, time } = this.getCaption(this.props.boxItem);
    const uri = window.fix(product.images[0]);
    return (
      <View key={boxId} style={styles.container}>
        <TouchableOpacity style={styles.boxHeader} onPress={this.onPressUser}>
          <Text numberOfLines={1} style={styles.boxName}>
            {owner.name}
          </Text>
          <View style={styles.boxImage}>
            <View style={styles.hr} />
            <CachedImage
              style={styles.boxPic}
              defaultSource={Images.defaultImage}
              source={{ uri: window.fix(owner.image), cache: 'force-cache' }}
            />
          </View>
          <Text style={styles.boxDate}>{time}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.prodBox} onPress={this.onPressProd}>
          <CachedImage
            resizeMode='contain'
            style={styles.prodImage}
            defaultSource={Images.defaultImage}
            source={{ uri, cache: 'force-cache' }}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lineText}>{line}</Text>
          </View>
          <View style={styles.lineIcon}>
            <Icons
              name={this.icon(status, subscriptionType)}
              size={18}
              color={status === 'open' ? Colors.wish : Colors.fire}
            />
          </View>
        </View>

        <BarLike likes={likes} liked={liked} commentsNo={comments} boxesNo={boxesNo} />
        <BoxItemActionBar onPress={this.onPressButton} />
      </View>
    );
  }
}

BoxItem.contextTypes = {
  goTo: React.PropTypes.func
};

const mapStateToProps = state => ({
  myId: state.profile.payload && state.profile.payload.id
});

const mapDispatchToProps = dispatch => ({
  addLike: (id, added) => dispatch(BoxItemActions.boxItemAddLikeRequest(id, added))
});

const areStatesEqual = (prev, next) => (
  prev.profile.payload 
  && next.profile.payload 
  && prev.profile.payload.id === next.profile.payload.id
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(BoxItem);
// export default connect(mapStateToProps, mapDispatchToProps)(BoxItem);
