import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import styles from './Styles/DrawerContentStyle';
import { Images } from '../../Themes';
import DrawerButton from './DrawerButton';
import { Actions as NavigationActions } from 'react-native-router-flux';

class DrawerContent extends Component {

  toggleDrawer () {
    this.context.drawer.toggle();
  }

  goToDayView = () => {
    this.toggleDrawer();
    NavigationActions.dayView();
  }

  goToMonthView = () => {
    this.toggleDrawer();
    console.log('not impemented yet');
  }

  goToUndoneView = () => {
    this.toggleDrawer();
    NavigationActions.undoneView();
  }

  goToGoalsView = () => {
    this.toggleDrawer();
    NavigationActions.goalsView();
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Day' onPress={this.goToDayView} />
        <DrawerButton text='Month' onPress={this.goToMonthView} />
        <DrawerButton text='Undone' onPress={this.goToUndoneView} />
        <DrawerButton text='Goals' onPress={this.goToGoalsView} />
      </ScrollView>
    );
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
};

export default DrawerContent;
