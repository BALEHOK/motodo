import {Observable} from "rxjs/Observable";
import guid from '../Lib/Guid';
import db from './Db';
import * as Tables from './SQL/Tables';
import {DayItemModel} from '../Models';
import dateTimeService from '../Services/DateTimeService';

class ItemRepository {
  getDayItems(date) {
    const ticks = date.getTime();

    return db.store.executeSql(`SELECT * FROM ${Tables.Todos.name}
      WHERE ${Tables.Todos.columns.done} = 0 AND ${Tables.Todos.columns.date} = (?)`,
      [ticks]
    ).map(resultSet => {
      if (!resultSet.rows.length) {
        return [];
      }

      let items = [];
      for(let i = 0; i !== resultSet.rows.length; i++) {
        let row = resultSet.rows.item(i);
        let item = new DayItemModel();
        item.id = row[Tables.Todos.columns.id];
        item.name = row[Tables.Todos.columns.name];
        item.importance = row[Tables.Todos.columns.importance];
        item.date = dateTimeService.fromTicks(row[Tables.Todos.columns.date]);

        items.push(item);
      }

      return items;
    });
  }

  addItem(item) {
    item.id = guid();

    const sqlScript = `INSERT INTO ${Tables.Todos.name}
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

    return db.store.executeSql(sqlScript, [
      item.id,                                            // id
      item.name,                                          // name
      item.time || 0,                                     // time
      item.importance,                                    // importance
      item.date.getTime(),                                // date
      0,                                                  // score
      0,                                                  // done
      '',                                                 // repeatingItemRef
      item.notifEnabled,                                  // notificationEnabled
      item.notifWhen ? item.notifWhen.getTime() : null,   // notificationWhen
      item.notifId                                        // notificationId
    ]);
  }

  deleteItem(itemId) {
    return db.items.remove(i => i.id === itemId);
  }

  // !!! DANGEROUS !!! updating item by ref
  markDone(itemId) {
    let item = db.items.findById(itemId);
    if (item) {
      item.done = true;
      return db.items.persistStoreRx();
    }

    return Observable.from([null]);
  }
}

export default new ItemRepository();
