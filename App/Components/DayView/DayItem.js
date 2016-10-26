import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Styles
import styles from './Styles/DayItemStyle';

export default class DayItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    active: PropTypes.bool
  };

  static defaultProps = {
    onPress: () => null,
    onLongPress: () => null
  }

  render() {
    const item = this.props.item;

    const style = [styles.row];
    if (this.props.active) {
      style.push(styles.rowDark);
    }

    return (
      <TouchableOpacity style={style}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
      >
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
        <Text style={styles.itemContent}>{item.name + ' (' + this.props.active + ')'}</Text>
      </TouchableOpacity>
    );
  }
}
