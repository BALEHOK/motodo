import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './Styles/NavigationContainerStyle';
import NavigationDrawer from './NavigationDrawer';
import DayView from '../Components/DayView';
import AddItem from '../Components/AddItem';
import UndoneView from '../Components/UndoneView';
import GoalsView from '../Components/GoalsView';

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
          >
            <Scene key='dayView' component={ DayView } title='Day view' initial hideNavBar />
            <Scene key='addItem' component={ AddItem } title='Add item' hideNavBar={false} />
            <Scene key='undoneView' component={ UndoneView } title='Undone view' hideNavBar={false} />
            <Scene key='goalsView' component={ GoalsView } title='Goals view' hideNavBar={false} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
