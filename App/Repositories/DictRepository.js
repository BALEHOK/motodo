import db from './Db';
import * as Tables from './SQL/Tables';

class DictRepository {
  getNum(key){
    const sqlScript =
      `SELECT ${Tables.Dict.columns.num} FROM ${Tables.Dict.name}
        WHERE ${Tables.Dict.columns.id} = (?)`;

    return db.store.executeSql(sqlScript, [key])
      .map(resultSet => {
        if (!resultSet.rows.length) {
          return 0;
        }

        return resultSet.rows.item(0)[Tables.Dict.columns.num];
      });
  }

  saveNum(key, number){
    const sqlScript =
      `INSERT OR REPLACE INTO ${Tables.Dict.name}
        VALUES (${key}, ${number}, null)`;

    return db.store.executeSql(sqlScript);
  }
}

export default new DictRepository();
