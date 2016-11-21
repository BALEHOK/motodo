import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import goalsRepository from '../Repositories/GoalsRepository';

const saveGoalsEpic = (action$) =>
  action$.ofType(actionTypes.goalsChanged)
    .mergeMap((action) => goalsRepository.saveGoals(action.goals))
    .map(() => actionCreators.goalsSaved());


export default saveGoalsEpic;
