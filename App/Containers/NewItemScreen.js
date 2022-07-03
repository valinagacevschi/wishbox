import React from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MyBoxesActions from '../Redux/MyBoxesRedux';
import ProductsActions from '../Redux/ProductsRedux';
import Header from '../Components/Header';
import ProductSider from '../Components/ProductSider';
import Card from '../Components/Card';
import Store from '../Components/Store';
import Button from '../Components/Button';
import ModalPicker from '../Components/ModalPicker';
// Styles
import styles from './Styles/BoxItemScreenStyle';
import { Colors, Fonts } from '../Themes';
// import { log } from 'util';

class NewItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props.navigation.state.params;
    this.state = { item };
  }

  componentDidMount() {
    this.saved = false;
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.fetching && newProps.selected && this.saved) {
      this.saved = false;
      this.context.reset('main');
      if (this.state.item.box) {
        this.props.myBoxes();
        setTimeout(() => this.context.goTo('mywishbox', { box: this.state.item.box }), 50);
      } else {
        this.context.reset('main');
      }
    }
  }

  onPressSave = () => {
    __DEV__ && console.log('on press save', this.state.item.box);
    
    if (this.props.boxes) {
      if (this.state.item.box || this.props.boxes.length === 1) {
        const box = this.state.item.box || this.props.boxes[0];
        Alert.alert('', `Add item to ${box.name || box.label} box ?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.state.item.id) {
                this.props.productAdd({ id: box.key, product_id: this.state.item.id });
              } else {
                this.props.addItem({ ...this.state.item, boxId: box.key });
              }
            }
          }
        ]);
      } else {
        this.refs.modal.open();
      }
      this.saved = true;
    } else {
      Toast.showWithGravity(I18n.t('incorrectInfo'), Toast.LONG, Toast.CENTER);
    }
  };

  onPressSuggest = () => {
    this.context.goTo('suggest', { product: this.state.item });
  };

  onChangeItem = box => {
    this.refs.modal.close();
    if (this.state.item.id) {
      this.props.productAdd({ id: box.key, product_id: this.state.item.id });
    } else {
      this.props.addItem({ ...this.state.item, boxId: box.key });    
    }  
  };

  render() {
    const { name, description, note, store } = this.state.item;
    return (
      <View style={styles.mainContainer}>
        <Header
          title={name}
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
          textStyle={{ marginRight: 40 }}
        />
        <ScrollView style={{ marginBottom: 0 }}>
          <TouchableOpacity
            onPress={() => this.context.goTo('photo', { images: this.state.item.images })}
          >
            <ProductSider showPrice product={this.state.item} />
          </TouchableOpacity>
          {!!store &&
            <Card title='available shops' icon='shops'>
              {store.map((stor, index) => (<Store key={index} {...stor} />))}
            </Card>
          }
          <Card title='description' icon='info'>
            <Text>{description}</Text>
          </Card>
          {!!note && (
            <Card title='user notes' icon='note'>
              <Text>{note}</Text>
            </Card>
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
        <View style={styles.extraBar}>
          <Button color={Colors.ocean} label='save' onPress={this.onPressSave} />
          <Button color={Colors.violet} label='suggest' onPress={this.onPressSuggest} />
        </View>
        {this.props.boxes &&
        this.props.boxes.length > 1 && (
          <ModalPicker
            ref='modal'
            cancelText={I18n.t('cancel')}
            data={[{ key: 0, section: true, label: 'Select Box' }, ...this.props.boxes]}
            selectStyle={{ height: 0, padding: 0, borderWidth: 0 }}
            onChange={this.onChangeItem}
          />
        )}
      </View>
    );
  }
}

NewItemScreen.contextTypes = {
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
  productAdd: data => dispatch(ProductsActions.productAdd(data)),
  addItem: item => dispatch(MyBoxesActions.myBoxesAddItem(item)),
  myBoxes: () => dispatch(MyBoxesActions.myBoxesRequest()),
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.myboxes.payload, next.myboxes.payload)
  && _.isEqual(prev.myboxes.selected, next.myboxes.selected)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(NewItemScreen);
//export default connect(mapStateToProps, mapDispatchToProps)(NewItemScreen);
