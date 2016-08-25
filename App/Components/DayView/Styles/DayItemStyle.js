import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  row: {
    alignItems:'flex-start',
    backgroundColor: Colors.fire,
    flex: 1,
    flexDirection: 'row',
    marginVertical: Metrics.smallMargin,
    padding: 10
  },
  itemIcons: {
    alignSelf: 'center',
    color: Colors.snow,
    width: 15
  },
  itemName: {
    alignSelf: 'center',
    color: Colors.snow
  }
});
