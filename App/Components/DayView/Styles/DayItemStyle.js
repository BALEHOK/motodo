import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  itemName: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center'
  }
})
