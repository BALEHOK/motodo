import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Styles
import styles from './Styles/DayItemStyle';

export default class DayItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const item = this.props.item;
    return (
      <View style={styles.row}>
        <View style={styles.itemIcons}>
          { item.importance
            ? <Icon name={'ios-alert-outline'} />
            : null
          }

          { item.notifEnabled
            ? <Icon name={'ios-notifications-outline'} />
            : null
          }
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    );
  }
}
