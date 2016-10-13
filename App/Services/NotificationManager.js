import Notification from 'react-native-system-notification';
import {Observable} from 'rxjs/Observable';

import dateTimeService from './DateTimeService';

function createNotification(config) {
  return Observable.fromPromise(Notification.create(config));
}

class NotificationManager {
  scheduleNotification(item) {
    if (!item.notifEnabled) {
      return Observable.of(null);
    }

    let notifDate = dateTimeService.setTime(item.date, item.notifWhen);

    return createNotification({
      subject: 'MoToDo scheduled',
      message: item.name,
      smallIcon: 'ic_launcher',
      autoClear: true,
      payload: { itemId: item.id },
      sendAt: notifDate
    }).map(notification => notification.id);
  }

  deleteNotification(id) {
    return Observable.fromPromise(Notification.delete(id));
  }
}

export default new NotificationManager();
