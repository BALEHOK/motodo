import db from './Db';
import * as Tables from './SQL/Tables';

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

        let goals = resultSet.rows.item(0)[Tables.Dict.columns.str];

        return JSON.parse(goals);
    });
  }

  saveGoals(goals) {
    const sqlScript =
    `INSERT OR REPLACE INTO ${Tables.Dict.name}
      VALUES (${Tables.Dict.ids.goals}, null, '${JSON.stringify(goals)}')`;

    return db.store.executeSql(sqlScript);
  }

  getScore(){
    return 0;
  }
  saveScore(score){
    return true;
  }
}

export default new GoalsRepository();
