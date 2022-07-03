import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  Platform,
  KeyboardAvoidingView,
 } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import BoxItemActions from '../Redux/BoxItemRedux';
import MyBoxesActions from '../Redux/MyBoxesRedux';
import ProductsActions from '../Redux/ProductsRedux';
import Header from '../Components/Header';
import ProductSider from '../Components/ProductSider';
import BarLike from '../Components/BarLike';
import Card from '../Components/Card';
import Owner from '../Components/Owner';
import Comments from '../Components/Comments';
import Button from '../Components/Button';
import StackImages from '../Components/StackImages';
import ModalPicker from '../Components/ModalPicker';
import Spinner from '../Components/Spinner';
import Store from '../Components/Store';
import Tutorial from '../Components/Tutorial';
// Styles
import styles from './Styles/BoxItemScreenStyle';
import { Colors, Fonts } from '../Themes';

class BoxItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const { boxItemId, boxItem: bi, scroll, onNavigateBack } = props.navigation.state.params;
    const boxItem = bi && bi.asMutable();
    this.state = {
      boxItemId,
      boxItem,
      scroll,
      chatters: [],
    };
    if (boxItem) {
      this.setFlags(boxItem);
    }
    this.deleted = false;
    if (onNavigateBack) {
      this.onNavigateBack = onNavigateBack;
    }
  }

  componentDidMount() {
    if (this.state.boxItem) {
      this.props.getComments(this.state.boxItem.id);
    } else if (this.state.boxItemId) {
      this.props.getBoxItem(this.state.boxItemId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.theBoxItem) {
      const boxItem = newProps.theBoxItem.asMutable();
      this.setState({ boxItem });
      this.setFlags(boxItem);
      this.onNavigateBack && this.onNavigateBack(this.state.boxItem.boxId);
    }
    if (newProps.comments && this.state.boxItem) {
      const uids = [...new Set(newProps.comments.map(item => item.uid))];
      this.setState({ chatters: this.state.boxItem.subscribers.filter(s => uids.includes(s.uid)) });
    }
    if (!newProps.fetching && !newProps.theBoxItem && this.deleted) {
      this.deleted = false;
      this.onNavigateBack && this.onNavigateBack();
      this.context.goBack();
    }
  }

  onChangeItem = box => {
    this.refs.modal.close();
    this.props.productAdd({ id: box.key, product_id: box.input });
  };

  onPressSave = productId => {
    if (this.props.boxes) {
      if (this.props.boxes.length === 1) {
        const box = this.props.boxes[0];
        Alert.alert('', `Add item to ${box.label} box ?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              this.props.productAdd({ id: box.key, product_id: productId });
              this.props.myBoxes();
            }
          }
        ]);
      } else {
        this.refs.modal.open(productId);
      }
    }
  };

  onCommentSend = comment => {
    this.props.addComment(this.state.boxItem.id, comment, false);
    const boxItem = this.state.boxItem;
    boxItem.comments += 1;
    this.setState({ boxItem }, () => this.props.getComments(this.state.boxItem.id));
  };

  onPressAccept = () => {
    this.onNavigateBack && this.onNavigateBack('accept');
    this.props.accept(this.state.boxItem.id);
    this.props.myBoxes();
  };

  onPressReject = () => {
    Alert.alert(I18n.t('alert'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => {
          this.deleted = true;
          this.onNavigateBack && this.onNavigateBack('reject');
          this.props.reject(this.state.boxItem.id);
        }
      }
    ]);
  };

  onPressReserve = () => {
    this.props.subscribe(this.state.boxItem.id, false);
  };

  onPressGotIt = () => {
    this.onNavigateBack && this.onNavigateBack('gotIt');
    this.props.received(this.state.boxItem.id);
    this.props.myBoxes();
  };

  onPressPurchase = () => {
    this.props.purchased(this.state.boxItem.id);
  };

  onPressDelete = () => {
    Alert.alert(I18n.t('alert'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          this.deleted = true;
          this.onNavigateBack && this.onNavigateBack('delete');
          this.props.delete(this.state.boxItem.id);
        }
      }
    ]);
  };

  onPressUnReserve = () => {
    Alert.alert(I18n.t('alert'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => {
          this.props.unsubscribe(this.state.boxItem.id);
        } 
      }
    ]);
  };

  onPressSplit = () => {
    this.props.subscribe(this.state.boxItem.id, true);
  };

  onPressSuggest = () => {
    this.context.goTo('suggest', { product: this.state.boxItem.product });
  };

  onPressChat = id => {
    this.context.goTo('chat', { chatters: this.state.chatters, id });
  };

  onPressImages = (subscribers, subscribersCount) => {
    this.context.goTo('contrib', { subscribers, subscribersCount });
  };

  setFlags(boxItem) {
    if (!boxItem) return;
    const { status, subscriptionType } = boxItem;
    const { id } = this.props.my || {};
    this.mine = boxItem.owner.id === id;
    this.subscribed = !!boxItem.subscribers.find(b => b.id === id);
    this.suggested = this.mine && status === 'suggest';
    this.open = status === 'open';
    this.purchased = status === 'purchased';
    this.gotit = status === 'received';

    this.available = subscriptionType === 'available';
    this.split = subscriptionType === 'split';
    this.locked = subscriptionType === 'subscribed';
    this.complete = subscriptionType === 'complete';
  }

  renderSuggested = force => {
    if (!this.suggested && !force) return null;
    return (
      <View style={styles.extraBar}>
        <Button color={Colors.ocean} icon='check' label='accept' onPress={this.onPressAccept} />
        <Button color={Colors.fire} label='reject' onPress={this.onPressReject} />
      </View>
    );
  };

  renderMine = force => {
    if (!this.mine || (this.suggested && !force)) return null;
    return (
      <View style={styles.extraBar}>
        {!this.gotit && <Button color={Colors.ocean} label='got-it' onPress={this.onPressGotIt} />}
        <Button color={Colors.violet} label='suggest' onPress={this.onPressSuggest} />
        <Button color={Colors.fire} label='delete' onPress={this.onPressDelete} />
      </View>
    );
  };

  renderNormal = () => {
    if (this.mine) return null;
    return (
      <View style={styles.extraBar}>
        {this.available &&
        !this.subscribed && (
          <Button color={Colors.fire} label='reserve' onPress={this.onPressReserve} />
        )}

        {!this.split &&
        this.subscribed &&
        !this.purchased && (
          <Button color={Colors.fire} label='unreserve' onPress={this.onPressUnReserve} />
        )}

        {!this.split &&
        this.subscribed &&
        !this.purchased && (
          <Button
            color={Colors.azure}
            icon='purchased'
            label='purchase'
            onPress={this.onPressPurchase}
          />
        )}

        {!this.subscribed && 
        !this.purchased && (
          <Button
            color={Colors.azure}
            icon='split-copy'
            label='split'
            onPress={this.onPressSplit}
          />
        )}

        {this.split &&
        this.subscribed &&
        !this.purchased && (
          <Button color={Colors.azure} label='unsplit' onPress={this.onPressUnReserve} />
        )}

        <Button color={Colors.violet} label='suggest' onPress={this.onPressSuggest} />
      </View>
    );
  };

  render() {
    // if (!this.state.boxItem) return null;
    const { product, owner, likes, liked, comments, boxesNo, userNote, subscribersCount, subscribers, id } = this.state.boxItem || {};
    return (
      <View style={styles.mainContainer}>
        <Header
          title={product ? product.name : 'Loading Item'}
          leftIcon={'back'}
          leftIconColor={Colors.wish}
          leftIconSize={Fonts.size.regular}
          leftIconPress={() => this.context.goBack()}
          textStyle={{ marginRight: 40 }}
          rightButton={!this.mine && this.state.boxItem}
          rightBtnText='Save'
          rightBtnPress={() => this.onPressSave(product.id)}
        />
        {!this.state.boxItem && <Spinner />}
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: -220 })}
          style={{ flex: Platform.OS === 'ios' ? 1 : null }}
        >
        {this.state.boxItem && (
          <KeyboardAwareScrollView
            ref={'kbScrollView'}
            // style={{ marginBottom: Platform.OS === 'ios' ? 0 : 0 }}
            onLayout={event => (this.listViewHeight = event.nativeEvent.layout.height)}
            onContentSizeChange={(_, contentHeight) =>
              this.state.scroll === 'end' &&
              this.refs.kbScrollView.scrollToEnd({
                y: contentHeight - this.listViewHeight
              })}
          >
            <TouchableOpacity
              onPress={() => this.context.goTo('photo', { images: product.images })}
            >
              <ProductSider showPrice product={product}>
                  <BarLike likes={likes} liked={liked} commentsNo={comments} boxesNo={boxesNo} />
              </ProductSider>
            </TouchableOpacity>
            {false &&
            __DEV__ && (
              <View>
                <Text> mine => {this.mine.toString()}</Text>
                <Text> subscribed => {this.subscribed.toString()}</Text>
                <Text> suggested => {this.suggested.toString()}</Text>
                <Text> open => {this.open.toString()}</Text>
                <Text> purchased => {this.purchased.toString()}</Text>
                <Text> gotit => {this.gotit.toString()}</Text>
                <Text> available => {this.available.toString()}</Text>
                <Text> split => {this.split.toString()}</Text>
                <Text> locked => {this.locked.toString()}</Text>
                <Text> complete => {this.complete.toString()}</Text>
              </View>
            )}
            <Owner owner={owner} />

            <Card title='available shops' icon='shops'>
              {product.store.map((store, index) => (<Store key={index} {...store} />))}
            </Card>

            <Card title='description' icon='info'>
              <Text>{product.description}</Text>
            </Card>
            {!!userNote && (
              <Card title='user notes' icon='note'>
                <Text>{userNote}</Text>
              </Card>
            )}

            {this.split && (
              <Card title='private chat' icon='comment'>
                <View style={styles.chatBox}>
                  <StackImages
                    large
                    images={this.state.chatters.map(c => c.image)}
                    count={this.props.comments && this.props.comments.length}
                  />
                  {this.subscribed && (
                    <TouchableOpacity style={styles.joinBtn} onPress={() => this.onPressChat(id)}>
                      <Text style={styles.joinText}>Join</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Card>
            )}

            {this.split && (
              <Card title='contributors' icon='menu3'>
                <StackImages
                  large
                  images={subscribers.map(l => l.image)}
                  count={subscribersCount}
                  onPress={() => this.onPressImages(subscribers, subscribersCount)}
                />
              </Card>
            )}
            <Card title='comments' icon='comments'>
              <Comments comments={this.props.comments} onSend={this.onCommentSend} />
            </Card>
              <View style={{ height: Platform.OS === 'ios' ? 50 : 80 }} />
          </KeyboardAwareScrollView>
        )}
        </KeyboardAvoidingView>
        {this.state.boxItem && this.renderSuggested()}
        {this.state.boxItem && this.renderMine()}
        {this.state.boxItem && this.renderNormal()}
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
        {!this.props.fetching && !this.mine && this.available &&
        <Tutorial route='boxitem' />}
      </View>
    );
  }
}

BoxItemScreen.contextTypes = {
  goTo: React.PropTypes.func,
  goBack: React.PropTypes.func
};

const mapStateToProps = state => ({
  theBoxItem: state.boxItem.payload,
  comments: state.boxItem.comments,
  my: state.profile.payload,
  fetching: state.myboxes.fetching,
  boxes: state.myboxes.payload && state.myboxes.payload.map(b => ({ key: b.id, label: b.name }))
});

const mapDispatchToProps = dispatch => ({
  getBoxItem: id => dispatch(BoxItemActions.boxItemRequest(id)),
  subscribe: (id, split) => dispatch(BoxItemActions.boxItemSubscribe(id, split)),
  unsubscribe: id => dispatch(BoxItemActions.boxItemUnsubscribe(id)),
  getComments: id => dispatch(BoxItemActions.boxItemCommRequest(id)),
  addComment: (id, comment, privated) =>
    dispatch(BoxItemActions.boxItemAddCommRequest(id, comment, privated)),

  accept: id => dispatch(BoxItemActions.boxItemAccept(id)),
  reject: id => dispatch(BoxItemActions.boxItemReject(id)),
  received: id => dispatch(BoxItemActions.boxItemReceived(id)),
  purchased: id => dispatch(BoxItemActions.boxItemPurchased(id)),
  delete: id => dispatch(MyBoxesActions.myBoxesDelItem(id)),
  productAdd: data => dispatch(ProductsActions.productAdd(data)),

  myBoxes: () => dispatch(MyBoxesActions.myBoxesRequest()),
});

const areStatesEqual = (prev, next) => (
  prev.myboxes.fetching === next.myboxes.fetching
  && _.isEqual(prev.boxItem.payload, next.boxItem.payload)
  && _.isEqual(prev.boxItem.comments, next.boxItem.comments)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(BoxItemScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(BoxItemScreen);
