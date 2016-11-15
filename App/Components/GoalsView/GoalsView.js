import React, { PropTypes } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput
} from 'react-native';

import Styles from '../AddItem/Styles/AddItemStyle';

export default class GoalsView extends React.Component {
  static propTypes = {
    goals: PropTypes.arrayOf(React.PropTypes.string).isRequired
  }

  handleChangeGoal1(){

  }

  handleChangeGoal2(){

  }

  handleChangeGoal3(){

  }

  renderRow(index, changeHandler, value) {
    return (
      <View style={Styles.row}>
        <Text style={Styles.rowLabel}>{`Goal ${index}`}</Text>
        <TextInput
          ref={`goal${index}`}
          style={Styles.textInput}
          value={value}
          keyboardType='default'
          returnKeyType='next'
          onChangeText={changeHandler}
          underlineColorAndroid='transparent'
          placeholder='goal text here' />
      </View>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={Styles.container}>
        {this.renderRow(1, this.handleChangeGoal1, 'bind db to these goals')}
        {this.renderRow(2, this.handleChangeGoal2, 'bind db to these goals')}
        {this.renderRow(3, this.handleChangeGoal3, 'bind db to these goals')}
      </ScrollView>
    );
  }
}
