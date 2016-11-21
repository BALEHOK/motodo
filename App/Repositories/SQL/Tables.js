export class Dict {
  static name = 'Dict';

  static columns = {
    id: 'id',
    num: 'num',
    str: 'str'
  }

  static ids = {
    dbVersion: 1,
    installed: 2,
    goals: 11 // stored as json
  }
}
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
