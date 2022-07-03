import React from 'react';
import { View, ScrollView, FlatList, Text, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import CheckBox from 'react-native-check-box';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import ProductsActions from '../Redux/ProductsRedux';
import Header from '../Components/Header';
import ProductSider from '../Components/ProductSider';
import User from '../Components/User';
import ModalPicker from '../Components/ModalPicker';
// Styles
import styles from './Styles/SuggestScreenStyle';
import { Colors } from '../Themes';

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.product = props.navigation.state.params.product;
    this.state = {
      checked: false,
      textValue: '',
      boxes: [],
      id: null,
    };
  }

  onCheck = () => {
    this.setState({ checked: !this.state.checked });
  }

  onChange = (event) => {
    this.setState({ textValue: event.nativeEvent.text || '' });
  }

  onPressSuggest = (id, boxes) => {
    const productId = this.product.id;
    this.setState({ id, boxes: boxes.map((b) => ({ key: b.id, label: b.name })) });

    if (boxes.length === 1) {
      const box = boxes[0];
      Alert.alert('', `Add item to ${box.name} box ?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => this.onChangeItem(box)
          },
        ]);
    } else {
      this.refs.modal.open(productId);
    }
  }

  onChangeItem = (box) => {
    this.refs.modal.close();
    const params = {
      id: this.state.id,
      box: box.key,
      comment: this.state.textValue,
      autoreserve: this.state.checked,
    };
    if (this.product.id) {
      this.props.suggest({
        ...params,
        product_id: this.product.id,
      });
    } else {
      this.props.suggest({
        ...this.product,
        ...params,
      });
    }
  }

  renderItem = ({ item }) => {
    const { id, name, image, boxes } = item;
    return (
      <TouchableOpacity onPress={() => this.onPressSuggest(id, boxes)}>
        <View style={styles.friend}>
          <User id={id} name={name} image={image} />
          <Icon.Button
            name='plus'
            size={12}
            borderRadius={20}
            iconStyle={{ marginLeft: 1, marginRight: -1, width: 12, height: 12 }}
            backgroundColor={Colors.wish}
            onPress={() => this.onPressSuggest(id, boxes)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={I18n.t('share')}
          leftIcon={'back'}
          leftIconSize={18}
          leftIconColor={Colors.wish}
          leftIconPress={() => this.context.goBack()}
        />
        <ScrollView>
          <TouchableOpacity onPress={() => this.context.goTo('photo', { images: this.product.images })}>
            <ProductSider showPrice product={this.product}>
              <Text style={styles.title}>{this.product.name}</Text>
              <CheckBox
                style={{ flex: 1, paddingHorizontal: 7, opacity: 0.3 }}
                rightTextStyle={{ color: Colors.coal }}
                onClick={this.onCheck}
                isChecked={this.state.checked}
                rightText={I18n.t('autoreserve')}
              />
              {/* <View style={styles.sendBox}>
                <AutoGrowingTextInput
                  style={styles.textInput}
                  placeholder={I18n.t('addCommentHere')}
                  value={this.state.textValue}
                  onChange={this.onChange}
                  style={styles.textInput}
                  maxHeight={200}
                  underlineColorAndroid={Colors.transparent}
                  ref={(r) => { this.textInput = r; }}
                />
              </View> */}
            </ProductSider>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, margin: 10 }}>{I18n.t('chooseFriend')}</Text>
          <FlatList
            contentContainerStyle={styles.grid}
            keyExtractor={(item, index) => index}
            data={this.props.friends}
            renderItem={this.renderItem}
          />
          {<ModalPicker
            ref='modal'
            cancelText={I18n.t('cancel')}
            data={[{ key: 0, section: true, label: 'Select Box' }, ...(this.state.boxes || [])]}
            selectStyle={{ height: 0, padding: 0, borderWidth: 0 }}
            onChange={this.onChangeItem}
          />}
        </ScrollView>
      </View>
    );
  }
}

Suggest.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
  friends: state.friends.payload && state.friends.payload.friends,
});

const mapDispatchToProps = (dispatch) => ({
  suggest: (data) => dispatch(ProductsActions.productSuggest(data)),
});

const areStatesEqual = (prev, next) => (
  prev.friends.payload
  && next.friends.payload
  && _.isEqual(prev.friends.payload.friends, next.friends.payload.friends)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(Suggest);
//export default connect(mapStateToProps, mapDispatchToProps)(Suggest);
