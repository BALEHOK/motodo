import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './Styles/NavigationContainerStyle';
import NavigationDrawer from './NavigationDrawer';
import DayView from '../Components/DayView';
import AddItem from '../Components/AddItem';

// screens identified by the router

/***************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer}>
          <Scene key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            backButtonTextStyle={Styles.rightButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <Scene key='dayView' component={ DayView } title='Day view' initial />
            <Scene key='addItem' component={ AddItem } title='Add item' />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
