import React, {PropTypes} from 'react';
import {
  View,
  ScrollView,
  Text,
  Switch,
  TextInput,
  Keyboard,
  LayoutAnimation,
  DatePickerAndroid
} from 'react-native';
import Button from 'react-native-button';
import { Actions as NavigationActions} from 'react-native-router-flux';
import Styles from './Styles/AddItemStyle';
import { Metrics } from '../../Themes';
import DayItemModel from '../../Models/DayItemModel';

export default class AddItem extends React.Component {
  static propTypes = {
    defaultDate: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.state = {
      uvisibleHeight: Metrics.screenHeight,
      item: this.getDefaultItemModel()
    };
  }

  getDefaultItemModel() {
    var itemModel = new DayItemModel();
    itemModel.name = '';
    itemModel.importance = 0;
    itemModel.date = this.props.defaultDate;

    return itemModel;
  }

  saveItem = () => {
    const item = this.state.item;
    if (item.name !== '') {
      this.props.addItem(item);
    }

    NavigationActions.pop();
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize
    });
  }

  keyboardDidHide = () => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight
    });
  }

  handleChangeName = (text) => {
    this.setItemState({ name: text });
  }

  handleChangeImportance = (value) => {
    this.setItemState({ importance: value ? 1 : 0});
  }

  showDatePicker = () => {
    DatePickerAndroid.open({date: this.props.defaultDate})
      .then(pickerResult => {
        var {action, year, month, day} = pickerResult;
        if (action !== DatePickerAndroid.dismissedAction) {
          var date = new Date(year, month, day);
          this.setItemState({date});
        }
      })
      .catch(e => console.log(e));
  }

  setItemState(diff) {
    this.setState({ item: Object.assign({}, this.state.item, diff) });
  }

  render () {
    const textInputStyle = Styles.textInput;
    const item = this.state.item;
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Name</Text>
            <TextInput
              ref='name'
              style={textInputStyle}
              value={item.name}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangeName}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='Name' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Important</Text>
            <Switch
              onValueChange={ this.handleChangeImportance }
              value={ !!item.importance } />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Date</Text>
            <Button onPress={this.showDatePicker}>
              {item.date.toDateString()}
            </Button>
          </View>

          <View style={Styles.row}>
            <Button onPress={this.saveItem}>Save</Button>
          </View>
      </ScrollView>
    );
  }
}
