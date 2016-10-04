import styles from './Styles/DayViewStyle';

import React, { PropTypes } from 'react';
import { View, Text, ListView, PanResponder, RecyclerViewBackedScrollView } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
import { Actions as NavigationActions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import dateTimeService from '../../Services/DateTimeService';

import AlertMessage from '../Shared/AlertMessageComponent';
import DayItem from './DayItem';

export default class DayView extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    goToPreviousDay: PropTypes.func.isRequired,
    goToNextDay: PropTypes.func.isRequired,
  };

  toolbarActions = [
    {id: 'done', title: 'Done', show: 'always'},
    {id: 'delete', title: 'Delete', show: 'always'}
  ];

  constructor (props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
      selectionMode: false,
      selected: []
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        const sgs = new SimpleGesture(e,gs);
        return sgs.isHorizontal();
      },
      onPanResponderRelease: (e, gs) => {
        const sgs = new SimpleGesture(e,gs);
        const isSwipeLeft = sgs.isSwipeLeft(),
          isSwipeRight = sgs.isSwipeRight();
        if (isSwipeLeft || isSwipeRight) {
          this.onHorizontalSwipe(isSwipeLeft);
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items === this.props.items) {
      return;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
    });
  }

  _renderRow = (dayItem) =>
    <DayItem item={dayItem} onLongPress={() => this.onItemLongPress(dayItem.id)} active={this.state.selected.includes(dayItem.id)} />

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0;
  }

  onNew() {
    NavigationActions.addItem();
  }

  onItemLongPress(itemId) {
    this.setState({
      selectionMode: true,
      selected: [itemId]
    });
  }

  onDone = () => {
    this.props.markDone(this.state.selected[0]);
    this.quitSelectionMode();
  }

  onDelete = () => {
    this.props.deleteItem(this.state.selected[0]);
    this.quitSelectionMode();
  }

  onHorizontalSwipe(isLeftSwipe) {
    if (isLeftSwipe) {
      this.props.goToNextDay();
    } else {
      this.props.goToPreviousDay();
    }
  }

  quitSelectionMode = () =>
    this.setState({
      selectionMode: false,
      selected: []
    });

  getToolbar() {
    return this.state.selectionMode
      ? (
        <View style={styles.toolbar}>
          <Text
            style={styles.toolbarText}
            onPress={this.quitSelectionMode}
          >
            Cancel
          </Text>

          <View style={styles.tolbarActions}>
            <Text
              style={[styles.toolbarText, styles.marginRight]}
              onPress={this.onDone}
            >
              Done
            </Text>
            <Text
              style={styles.toolbarText}
              onPress={this.onDelete}
            >
              Delete
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.toolbar}>
          <Text style={styles.toolbarText}>
            { dateTimeService.toDateString(this.props.date) }
          </Text>
        </View>
      );
  }

  render () {
    return (
      <View style={styles.container} { ...this._panResponder.panHandlers }>
        {this.getToolbar()}
        <AlertMessage title='You have no items for today!' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        />
        <ActionButton title="New Task" buttonColor={styles.colors.bloodOrange} onPress={this.onNew} />
      </View>
    );
  }
}
