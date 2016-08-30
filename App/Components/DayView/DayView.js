import styles from './Styles/DayViewStyle';

import React, { PropTypes } from 'react';
import { View, ListView, PanResponder } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
import { Actions as NavigationActions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';

import AlertMessage from '../Shared/AlertMessageComponent';
import DayItem from './DayItem';

export default class DayView extends React.Component {
  static propTypes = {
    items: PropTypes.array.required,
    fetchItems: PropTypes.func.required,
    goToPreviousDay: PropTypes.func.required,
    goToNextDay: PropTypes.func.required,
  };

  constructor (props) {
    super(props);

    // Set up our two placeholder values for scrollToBottom()
    this.listHeight = 0;
    this.footerY = 0;

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items)
    };

    this._panResponder = PanResponder.create({
      // Only respond to movements if the gesture is a swipe up
      onMoveShouldSetPanResponder: (e, gs) => {
        const sgs = new SimpleGesture(e,gs);
        const isSwipeLeft = sgs.isSwipeLeft(),
          isSwipeRight = sgs.isSwipeRight();
        if (isSwipeLeft || isSwipeRight) {
          this.onHorizontalSwipe(isSwipeLeft);
          return false;
        }

        return true;
      }
    });
  }

  componentDidMount() {
    this.props.fetchItems(this.props.date);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
    });
  }

  _renderRow (dayItem) {
    return (
      <DayItem item={dayItem} />
    );
  }

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0;
  }

  // Magical helper function that can scroll your ListView to the bottom
  scrollToBottom(animated = true) {
    if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
      // Calculates the y scroll position inside the ListView
      const scrollTo = this.footerY - this.listHeight;

      // Scroll that sucker!
      this.refs.listView.scrollTo({
        y: scrollTo,
        animated: animated,
      });
    }
  }

  // Save the list's height when it renders
  onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.listHeight = layout.height;
  }

  // Render a footer. Keep onFooterLayout if you decide to fill out this section
  renderFooter = () => {
    return (
      <View onLayout={this.onFooterLayout} />
    );
  }

  // When the footer is laid out, store its y-position
  onFooterLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.footerY = layout.y;
  }

  onNew() {
    NavigationActions.addItem();
  }

  onHorizontalSwipe(isLeftSwipe) {
    if (isLeftSwipe) {
      this.props.goToPreviousDay();
    } else {
      this.props.goToNextDay();
    }
  }

  render () {
    return (
      <View style={styles.container} { ...this._panResponder.panHandlers }>
        <AlertMessage title='You have no items for today!' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          onLayout={this.onLayout}
          renderRow={this._renderRow}
          renderFooter={this.renderFooter}
          enableEmptySections
        />
        <ActionButton title="New Task" buttonColor={styles.colors.bloodOrange} onPress={this.onNew} />
      </View>
    );
  }
}
