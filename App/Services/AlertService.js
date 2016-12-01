import {Alert} from 'react-native';

class AlertService {
  alert(message, title = 'MoToDo') {
    Alert.alert(title, message, [{text: 'OK'}]);
  }
}

export default new AlertService();
