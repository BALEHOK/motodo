import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../Themes/';

export default {
  colors: Colors,
  ...StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      flex: 1
    },
    listContent: {
      flex: 1,
      marginTop: Metrics.baseMargin
    },
    toolbar: {
      alignItems: 'center',
      backgroundColor: Colors.background,
      flexDirection: 'row',
      height: Metrics.navBarHeight,
      justifyContent: 'space-between',
      marginHorizontal: Metrics.doubleBaseMargin
    },
    tolbarActions: {
      flexDirection: 'row'
    },
    toolbarText: {
      ...Fonts.style.regular,
      color: Colors.snow,
    },
    marginRight: {
      marginRight: Metrics.doubleBaseMargin
    }
  })
};
