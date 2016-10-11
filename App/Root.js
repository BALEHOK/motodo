import React, { PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import * as appActions from './Actions/AppActionCreators';
import DebugSettings from './Config/DebugSettings';
import NavigationRouter from './Navigation/NavigationRouter';
import './ObservableImports';
import db from './Repositories/Db';

// Styles
import styles from './Components/Shared/Styles/RootStyle';

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { dispatch } = this.props.store;

    db.initialized$.subscribe(() => dispatch(appActions.startup()));
  }

  render () {
    console.disableYellowBox = !DebugSettings.yellowBox;

    return (
      <Provider store={this.props.store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          <NavigationRouter />
        </View>
      </Provider>
    );
  }
}
