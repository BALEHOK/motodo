import React, { PropTypes } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput
} from 'react-native';
import Button from 'react-native-button';
import { Actions as NavigationActions} from 'react-native-router-flux';

import styles from '../AddItem/Styles/AddItemStyle';

export default class GoalsView extends React.Component {
  static propTypes = {
    goal1: PropTypes.string,
    goal2: PropTypes.string,
    goal3: PropTypes.string,
    goalsChanged: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      goal1: props.goal1,
      goal2: props.goal2,
      goal3: props.goal3
    };

    props.goalsViewLoaded();

    console.log('GoalsView loaded');
  }

  handleChangeGoal1 = (goal1) => {
    this.setState({goal1});
  };

  handleChangeGoal2 = (goal2) => {
    this.setState({goal2});
  };

  handleChangeGoal3 = (goal3) => {
    this.setState({goal3});
  };

  // тут вали.тся все нахер
  saveGoals = () => {
    this.props.goalsChanged(this.state);

    NavigationActions.pop();
  }

  renderRow(index, changeHandler, value) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{`Goal ${index}`}</Text>
        <TextInput
          style={styles.textInput}
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
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={styles.container}>
        {this.renderRow(1, this.handleChangeGoal1, this.state.goal1)}
        {this.renderRow(2, this.handleChangeGoal2, this.state.goal2)}
        {this.renderRow(3, this.handleChangeGoal3, this.state.goal3)}

        <View style={styles.row}>
          <Button onPress={this.saveGoals}>Save</Button>
        </View>
      </ScrollView>
    );
  }
}
