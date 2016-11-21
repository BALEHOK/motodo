import SQLite from 'react-native-sqlite-storage';
import {Observable} from 'rxjs/Observable';
import * as Tables from './Tables';
// import "rxjs/add/observable/create";

function createRxNext(s) {
  return (x) => {
    s.next(x);
    s.complete();
  };
}

function createRxError(s) {
  return (e) => {
    s.error(e);
    s.complete();
  };
}

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
function initialise(db, onSuccess, onError) {
  let dbVersion = 0;
  db.transaction(
    function (tx) {
      // Dict table
      tx.executeSql(`DROP TABLE IF EXISTS ${Tables.Dict.name}`);
      tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Tables.Dict.name} (
        ${Tables.Dict.columns.id} INTEGER primary key,
        ${Tables.Dict.columns.num} BIGINT NULL,
        ${Tables.Dict.columns.str} TEXT NuULL
      )`);

      tx.executeSql(`SELECT ${Tables.Dict.columns.num} FROM ${Tables.Dict.name}
        WHERE ${Tables.Dict.columns.id} = ${Tables.Dict.ids.dbVersion}`,
        [],
        (tx, resultSet) => {
          if (resultSet.rows.length) {
            dbVersion = resultSet.rows.item(0)[Tables.Dict.columns.num];
          }

          if (!dbVersion) {
            tx.executeSql(`INSERT INTO ${Tables.Dict.name} VALUES (${Tables.Dict.ids.dbVersion}, 1, null)`);
            tx.executeSql(`INSERT INTO ${Tables.Dict.name} VALUES (${Tables.Dict.ids.installed}, ${new Date().getTime()}, null)`);
          }
        }
      );

      // tx.execSQL("CREATE TABLE dayScores" +
      //           "(_id INTEGER PRIMARY KEY AUTOINCREMENT," +
      //           "date BIGINT NOT NULL," +
      //           "score INTEGER NOT NULL);");

      // Todos tabel
      // tx.executeSql(`DROP TABLE IF EXISTS ${Tables.Todos.name}`);
      tx.executeSql(`CREATE TABLE IF NOT EXISTS ${Tables.Todos.name} (
        ${Tables.Todos.columns.id} TEXT primary key,
        ${Tables.Todos.columns.name} TEXT NOT NULL,
        ${Tables.Todos.columns.time} REAL NOT NULL,
        ${Tables.Todos.columns.importance} INTEGER NOT NULL,
        ${Tables.Todos.columns.date} BIGINT NOT NULL,
        ${Tables.Todos.columns.score} INTEGER NOT NULL,
        ${Tables.Todos.columns.done} BOOLEAN NOT NULL,
        ${Tables.Todos.columns.repeatingItemRef} TEXT NULL,
        ${Tables.Todos.columns.notificationEnabled} BOOLEAN NOT NULL,
        ${Tables.Todos.columns.notificationWhen} BIGINT NULL,
        ${Tables.Todos.columns.notificationId} INTEGER NULL
      )`);
    },
    function (error) {
        console.log('transaction error: ' + error.message);
        onError(error);
    },
    function () {
        console.log('init db transaction ok');
        onSuccess();
    }
  );
  return db;
}

export default class SQLiteStore {
  initialized$ = null;
  db = null;

  constructor() {
    this.initialized$ = Observable.create(openDbRx)
      .map(db => this.db = db)
      .mergeMap(db => Observable.create(
        subscriber => initialise(db, createRxNext(subscriber), createRxError(subscriber))
      ));
  }

  executeSql(query, params) {
    return Observable.create(subscriber => {
      this.db.executeSql(
        query, params,
        (resultSet) => {
          subscriber.next(resultSet);
          subscriber.complete();
        },
        (e) => {
          subscriber.error(e);
          subscriber.complete();
        }
      );
    });
  }
}
