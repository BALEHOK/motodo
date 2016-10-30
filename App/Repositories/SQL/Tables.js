export class Todos {
  static name = 'todos';

  static columns = {
    id: 'id',
    name: 'name',
    time: 'time',
    importance: 'importance',
    date: 'date',
    score: 'score',
    done: 'done',
    counted: 'counted',
    repeatingItemRef: 'rep_id',
    notificationEnabled: 'notification',
    notificationWhen: 'notif_when',
    notificationId: 'notif_id',
  };
}

export class RepeatingTodos {
  static name = 'repeatingTodos';

  static columns = {
    id: '_id',
    title: 'title',
    time: 'time',
    isImportant: 'isImportant',
    type: 'type',
    notificationEnabled: 'notification',
    notificationTime: 'notif_time'
  };

  static repeatType = {
    onceAWeek: 1
  };
}
