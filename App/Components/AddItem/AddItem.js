import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  Switch,
  TextInput,
  Keyboard,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import Styles from '../Styles/AddItemStyle';
// import Actions from '../Actions/AddItemActionCreators';
import { Metrics } from '../../Themes';

class AddItem extends React.Component {
  static propTypes = {
  };

  constructor (props) {
    super(props);
    this.state = {
      uvisibleHeight: Metrics.screenHeight,
      name: '',
      importance: 0
    };
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

  handleChangeName = (text) =>
    this.setState({ name: text })

  handleChangeImportance = (value) =>
    this.setState({ importance: value ? 1 : 0})

  render () {
    const textInputStyle = Styles.textInput;
    const state = this.state;
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Name</Text>
            <TextInput
              ref='name'
              style={textInputStyle}
              value={state.name}
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
              value={ !!state.importance } />
          </View>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
