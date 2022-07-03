import React from 'react';
import { TouchableOpacity } from 'react-native';
import User from '../Components/User';
import Card from '../Components/Card';
// Styles
import styles from './Styles/OwnerStyle';
import { Colors, Icons } from '../Themes';

export default class Owner extends React.Component {
  pressOwner = () => 
    this.context.goTo('wishlist', { user: this.props.owner });

  render() {
    const { name, image, id } = this.props.owner;
    return (
      <Card title={'owner'} icon={'profile'}>
        <TouchableOpacity style={styles.user} onPress={this.pressOwner}>
          <User id={id} name={name} image={image} />
          <Icons name='arrow' size={14} color={Colors.coal} />
        </TouchableOpacity>
      </Card>
    );
  }
}

Owner.contextTypes = {
  goTo: React.PropTypes.func,
};
