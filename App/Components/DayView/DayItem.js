import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Styles
import styles from '../Styles/DayItemStyle'

export default class DayItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const item = this.props.item;
    return (
      <View style={styles.row}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemName}>{item.title}</Text>
      </View>
    )
  }
}
