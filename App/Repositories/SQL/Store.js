import SQLite from 'react-native-sqlite-storage';
import {Observable} from 'rxjs/Observable';
import * as Tables from './Tables';
// import "rxjs/add/observable/create";

function openDbRx(subscriber) {
  SQLite.openDatabase(
    {name: 'motodo.db', location: 'default'},
    (db) => {
      subscriber.next(db);
      subscriber.complete();
    },
    (e) => {
      subscriber.error(e);
      subscriber.complete();
    }
  );
}

// надо проверить состояние дб и создать таблицы, если необходимо
function initialise(db) {
  let dbVersion = 0;
  db.transaction(
    function (tx) {
      // Dict table
      tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Tables.Dict.name}
        (${Tables.Dict.columns.id} interger primary key, ${Tables.Dict.columns.num} integer, ${Tables.Dict.columns.str} text)`);

      tx.executeSql(`SELECT ${Tables.Dict.columns.num} FROM ${Tables.Dict.name}
        WHERE ${Tables.Dict.columns.id} = ${Tables.Dict.ids.dbVersion}`,
        [],
        (tx, resultSet) => {
          if (resultSet.rows.length) {
            dbVersion = resultSet.rows.item(0)[Tables.Dict.columns.num];
          }

          if (!dbVersion) {
            tx.executeSql(`INSERT INTO ${Tables.Dict.name} VALUES (${Tables.Dict.ids.dbVersion}, 1, null)`);
          }
        }
      );
    },
    function (error) {
        console.log('transaction error: ' + error.message);
    },
    function () {
        console.log('init db transaction ok');
    }
  );
  return db;
}

class SQLiteStore {
  initialized$ = null;
  db = null;

  constructor() {
    this.initialized$ = Observable.create(openDbRx)
      .map(db => this.db = db)
      .map(initialise);
  }
}

export default new SQLiteStore();
