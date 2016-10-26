import styles from '../DayView/Styles/DayViewStyle';

import React, { PropTypes } from 'react';
import { View, ListView, RecyclerViewBackedScrollView } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import AlertMessage from '../Shared/AlertMessageComponent';

import DayItem from '../DayView/DayItem';

export default class DayView extends React.Component {
  static propsTypes = {
    items: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items === this.props.items) {
      return;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
    });
  }

  renderRow = (dayItem) =>
    <DayItem item={dayItem}
      onPress={() => this.onItemPress(dayItem.date)}
    />

  // надо придумать, как хранить андан айтимы в стейте

  // самая простая идея - по клику переходить ко дню с этой таской
  onItemPress(itemDate) {
    // set date
    NavigationActions.dayView();
  }

  render () {
    let p = this.props;

    return (
      <View style={styles.container}>
        <AlertMessage title='You have no undone items!' show={!p.items.length} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        />
      </View>
    );
  }
}
