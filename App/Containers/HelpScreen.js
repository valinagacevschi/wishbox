import React from 'react';
import { View, FlatList, TouchableOpacity, Linking, Switch } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProfileActions from '../Redux/ProfileRedux';
import Header from '../Components/Header';
import ListItem from '../Components/ListItem';
// Styles
import xstyles from './Styles/HelpScreenStyle';
import { Colors, Icons } from '../Themes';

const lines = [
  { name: 'Tutorial', details: 'switch on/off', switched: true },
  { name: 'Intro', details: 'show intro slides', key: 'intro' },
  { name: 'Contact', details: 'email: office@wishbox.club', link: 'mailto:office@wishbox.club' },
];

class HelpScreen extends React.Component {
  onPressBox = (item) => {
    if (item.key) {
      this.context.goTo(item.key);
    } else if (item.link) {
      Linking.openURL(item.link).catch(err => console.log('An error occurred', err));
    } else if (item.switched) {
      this.props.toggleTutorial(!this.props.tutorialOn);
    }
  }

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => this.onPressBox(item)}>
        <ListItem dark name={item.name} item={item}>
          {item.switched && <Switch
            style={{ alignSelf: 'center', marginRight: 5 }}
            onValueChange={(value) => this.props.toggleTutorial(value)}
            value={this.props.tutorialOn}
          />}
          {!item.switched && <Icons size={18} name={'arrow'} color={Colors.coal} style={styles.carret} />}
        </ListItem>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('help')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          data={lines}
          extraData={this.props.tutorialOn}
          renderItem={this.renderItem}
          pageSize={20}
        />
      </View>
    );
  }
}

HelpScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const styles = {
  ...xstyles,
  carret: {
    alignSelf: 'center',
    marginRight: 5
  },  
};

const mapStateToProps = (state) => ({
  tutorialOn: state.profile.tutorialOn,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTutorial: data => dispatch(ProfileActions.toggleTutorial(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen);
