import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Styles
import styles from './Styles/DayItemStyle';

export default class DayItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onLongPress: PropTypes.func.isRequired
  };

  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity style={styles.row} onLongPress={() => this.props.onLongPress(item.id)}>
        <View style={styles.itemIcons}>
          { item.importance
            ? <Icon name={'ios-alert-outline'} style={styles.itemContent} />
            : null
          }

          { item.notifEnabled
            ? <Icon name={'ios-notifications-outline'} style={styles.itemContent} />
            : null
          }
        </View>
        <Text style={styles.itemContent}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}
