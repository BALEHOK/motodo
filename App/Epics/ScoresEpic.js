import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import goalsRepository from '../Repositories/GoalsRepository';
import alertService from '../Services/AlertService';

const rewardScore1 = 9;
const rewardScore2 = 26;
const rewardScore3 = 50;
const rewardAlertTitle = 'Goal reached';

const onItemDone = (action$, store) =>
  action$.ofType(actionTypes.itemDone)
    .mergeMap(action => {
      const item = action.item;
      const itemScore = calcItemScore(item);
      return goalsRepository.getScore()
        .map(currentScore => {
          let totalScore = currentScore + itemScore;

          if (currentScore < rewardScore1 && totalScore >= rewardScore1) {
            store.dispatch(actionCreators.goalReached(1));
          }

          if (currentScore < rewardScore2 && totalScore >= rewardScore2) {
            store.dispatch(actionCreators.goalReached(2));
          }

          if (currentScore < rewardScore3 && totalScore >= rewardScore3) {
            store.dispatch(actionCreators.goalReached(3));
            totalScore -= rewardScore3;
          }

          return totalScore;
        });
    })
    .mergeMap(totalScore => goalsRepository.saveScore(totalScore))
    .mapTo(actionCreators.dummy());

const onGoalReached = (action$, store) =>
  action$.ofType(actionTypes.goalReached)
    .mergeMap(action => {
      const goalProp = 'goal' + action.goalNum;
      let goals = store.getState().goals;
      if (goals && goals[goalProp]){
        return Observable.of(goals[goalProp]);
      }

      return goalsRepository.getGoals()
        .map(goals => goals[goalProp]);
    })
    .map(rewardMessage => alertService.alert(getRewardMessage(rewardMessage), rewardAlertTitle))
    .mapTo(actionCreators.dummy());

function getRewardMessage(reward) {
  return `Your reward is: ${reward}`;
}

function calcItemScore(item){
  let score;
  const time = item.time;
  const isImportant = item.importance > 0;
  if (time < 0.5) {
      if (isImportant) {
          score = 1;
      } else {
          score = 0;
      }
  } else if (time < 1) {
      score = 1;
  } else if (time < 2) {
      if (isImportant) {
          score = 2;
      } else {
          score = 1;
      }
  } else if (time < 3 && !isImportant) {
      score = 2;
  } else {
      score = 3;
  }

  return score;
}

export default combineEpics(
  onItemDone,
  onGoalReached
);
