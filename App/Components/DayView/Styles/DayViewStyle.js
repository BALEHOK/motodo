import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../Themes/';

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
      backgroundColor: Colors.background,
      color: Colors.snow,
      height: Metrics.navBarHeight
    }
  })
};
