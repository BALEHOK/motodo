import db from './Db';
import * as Tables from './SQL/Tables';

class GoalsRepository {
  getGoals() {
    const sqlScript =
    `SELECT ${Tables.Dict.columns.str} FROM ${Tables.Dict.name}
      WHERE ${Tables.Todos.columns.id} = ${Tables.Todos.ids.goals}`;

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
      VALUES (${Tables.Todos.ids.goals}, null, ${JSON.stringify(goals)})`;

    return db.store.executeSql(sqlScript);
  }
}

export default new GoalsRepository();
