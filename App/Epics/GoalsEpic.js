import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import goalsRepository from '../Repositories/GoalsRepository';

const goalsViewLoadedEpic = (action$) =>
  action$.ofType(actionTypes.goalsViewLoaded)
    .map(action => console.log('goalsViewLoadedEpic') || action)
    .mergeMap(() => goalsRepository.getGoals())
    .map((goals) => actionCreators.goalsLoaded(goals));

const saveGoalsEpic = (action$) =>
  action$.ofType(actionTypes.goalsChanged)
    .map(action => console.log('saveGoalsEpic') || action)
    .mergeMap((action) => goalsRepository.saveGoals(action.goals)
      .map(() => actionCreators.goalsLoaded(action.goals)));

export default combineEpics(
  goalsViewLoadedEpic,
  saveGoalsEpic
);
