import SQLite from 'react-native-sqlite-storage';
import {Observable} from "rxjs/Observable";
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
  db.transaction(
    function (tx) {
      tx.executeSql('SELECT num from version', (t, num) => console.log(num), (t, e) => console.log('error select', e));
    },
    function (error) {
        console.log('transaction error: ' + error.message);
    },
    function () {
        console.log('transaction ok');
    }
  );

  // db.transaction(function (tx) {
  //   tx.executeSql('CREATE TABLE customerAccounts (firstname, lastname, acctNo)');
  // }, function (error) {
  //     console.log('transaction error: ' + error.message);
  // }, function () {
  //     console.log('transaction ok');
  // });
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

  executeSql(tx, query, params) {
    tx.executeSql(query, params);
  }
}

// export default new SQLiteStore();
