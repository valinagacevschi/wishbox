import React from 'react';
import { View, FlatList } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Header from '../Components/Header';
import Avatar from '../Components/Avatar';
// Styles
import styles from './Styles/ChatInfoScreenStyle';
import { Colors } from '../Themes';

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
    const { chatters } = props.navigation.state.params;
    this.state = { chatters };
  }
  
  renderItem = ({ item }) => (
    <Avatar user={item} onPressOwner={() => null} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t('privateChatInfo')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <FlatList
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          data={this.state.chatters}
          renderItem={this.renderItem}
          pageSize={20}
        />
      </View>
    );
  }

}

ChatInfo.contextTypes = {
  // goTo: React.PropTypes.func,
  goBack: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo);
