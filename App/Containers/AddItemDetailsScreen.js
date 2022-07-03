import React from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import MyBoxesActions from '../Redux/MyBoxesRedux';
import ProductsActions from '../Redux/ProductsRedux';
import Header from '../Components/Header';
import ProductSider from '../Components/ProductSider';
import ItemForm from '../Components/ItemForm';
import RoundedButton from '../Components/RoundedButton';
import Spinner from '../Components/Spinner';
import ModalPicker from '../Components/ModalPicker';
import Tutorial from '../Components/Tutorial';
// Styles
import styles from './Styles/AddItemDetailsScreenStyle';
import { Colors, Fonts } from '../Themes';

class AddItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    const { product, box } = props.navigation.state.params;
    const { images, name, description, price, store, currency } = product;
    this.state = {
      product,
      images,
      name,
      description,
      price,
      currency,
      store,
      box,
      enabled: !product.id,
    };
    this.added = false;
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.fetching && this.added) {
      this.added = false;
      if (this.state.box) {
        setTimeout(() => this.context.goTo('mywishbox', { box: this.state.box }), 50);
      } else {
        this.context.reset('main');
      }
    }
  }

  onAddItem = () => {
    if (this.props.boxes) {
      if (this.state.box || this.props.boxes.length === 1) {
        const box = this.state.box || this.props.boxes[0];
        Alert.alert('', `Add item to ${box.name || box.label} box ?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.state.enabled) {
                this.props.addItem({ ...this.state, boxId: box.id || box.key });
              } else {
                this.props.productAdd({ id: box.id || box.key, product_id: this.state.product.id });
              }
              this.added = true;
            }
          }
        ]);
      } else {
        this.refs.modal.open();
      }
    }
  };

  onChangeItem = box => {
    this.refs.modal.close();
    if (this.state.enabled) {
      this.props.addItem({ ...this.state, boxId: box.key });
    } else {
      this.props.productAdd({ id: box.key, product_id: this.state.product.id });
    }
    this.added = true;
  };

  onChange = fields => {
    const { name, description, price, currency, store } = fields;
    this.setState({
      name,
      description,
      price,
      currency,
      store
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title="New Item"
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
          textStyle={{ marginRight: 40 }}
          rightButton
          rightBtnText="Edit"
          rightBtnPress={() => this.setState({ enabled: true })}
        />
        <KeyboardAwareScrollView style={styles.kbView} resetScrollToCoords={{ x: 0, y: 0 }}>
          <TouchableOpacity
            onPress={() => this.context.goTo('photo', { images: this.state.product.images })}
          >
            <ProductSider product={this.state.product} />
          </TouchableOpacity>
          <ItemForm
            enabled={this.state.enabled}
            fields={this.state.product}
            onChange={this.onChange}
            onSubmit={this.onAddItem}
          />
          {this.props.fetching && <Spinner style={styles.indicator} />}
        </KeyboardAwareScrollView>
        <View style={{ marginBottom: 0 }}>
          <RoundedButton style={styles.addItem} onPress={this.onAddItem}>
            Add Item
          </RoundedButton>
        </View>
        {this.props.boxes &&
        this.props.boxes.length > 1 && (
          <ModalPicker
            ref="modal"
            cancelText={I18n.t('cancel')}
            data={[{ key: 0, section: true, label: 'Select Box' }, ...this.props.boxes]}
            selectStyle={{ height: 0, padding: 0, borderWidth: 0 }}
            onChange={this.onChangeItem}
          />
        )}
        {false && !this.props.fetching && <Tutorial route='addItem' />}
      </View>
    );
  }
}

AddItemDetailsScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func,
  reset: React.PropTypes.func
};

const mapStateToProps = state => ({
  fetching: state.myboxes.fetching,
  selected: state.myboxes.selected,
  boxes: state.myboxes.payload && state.myboxes.payload.map(b => ({ key: b.id, label: b.name }))
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(MyBoxesActions.myBoxesAddItem(item)),
  productAdd: data => dispatch(ProductsActions.productAdd(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItemDetailsScreen);
