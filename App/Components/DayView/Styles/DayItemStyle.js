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
    padding: Metrics.baseMargin
  },
  itemIcons: {
    alignSelf: 'center',
    width: 15
  },
  itemContent: {
    alignSelf: 'center',
    color: Colors.snow
  }
});
