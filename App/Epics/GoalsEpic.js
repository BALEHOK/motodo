import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';

const saveGoalsEpic = (action$) =>
  action$.ofType(actionTypes.goalsChanged)
    .mergeMap((action) => goalsRepository.saveGoals(action.goals))
    .map(() => actionCreators.fetchItems());


export default saveGoalsEpic;
