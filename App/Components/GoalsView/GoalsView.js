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
    goal1: PropTypes.string,
    goal2: PropTypes.string,
    goal3: PropTypes.string,
    goalsChanged: PropTypes.func
  }

  constructor(props){
    super(props);

    this.state = {
      goal1: props.goal1,
      goal2: props.goal2,
      goal3: props.goal3
    };
  }

  handleChangeGoal1(goal1){
    this.setState({goal1});
  }

  handleChangeGoal2(goal2){
    this.setState({goal2});
  }

  handleChangeGoal3(goal3){
    this.setState({goal3});
  }

  saveGoals() {
    this.props.goalsChanged(this.state);
  }

  renderRow(index, changeHandler, value) {
    return (
      <View style={Styles.row}>
        <Text style={Styles.rowLabel}>{`Goal ${index}`}</Text>
        <TextInput
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
        <View style={Styles.row}>
          {this.renderRow(1, this.handleChangeGoal1, this.state.goal1)}
          {this.renderRow(2, this.handleChangeGoal2, this.state.goal2)}
          {this.renderRow(3, this.handleChangeGoal3, this.state.goal3)}
        </View>

        <View style={Styles.row}>
          <Button onPress={this.saveGoals}>Save</Button>
        </View>
      </ScrollView>
    );
  }
}
