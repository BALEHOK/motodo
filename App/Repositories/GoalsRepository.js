import db from './Db';
import * as Tables from './SQL/Tables';

//была ошибка в колбеке. проверить, что сохраняется и потом правильно читается
class GoalsRepository {
  getGoals() {
    const sqlScript =
    `SELECT ${Tables.Dict.columns.str} FROM ${Tables.Dict.name}
      WHERE ${Tables.Dict.columns.id} = ${Tables.Dict.ids.goals}`;

    return db.store.executeSql(sqlScript)
      .map(resultSet => {
        if (!resultSet.rows.length) {
          return {
            goal1: '',
            goal2: '',
            goal3: ''
          };
        }

        let goals = resultSet.rows.item(0).row[Tables.Dict.columns.str];

        return JSON.parse(goals);
    });
  }

  saveGoals(goals) {
    const sqlScript =
    `INSERT OR REPLACE INTO ${Tables.Dict.name}
      VALUES (${Tables.Dict.ids.goals}, null, '${JSON.stringify(goals)}')`;

    return db.store.executeSql(sqlScript);
  }
}

export default new GoalsRepository();
