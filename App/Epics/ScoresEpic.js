import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import goalsRepository from '../Repositories/GoalsRepository';

const rewardScore1 = 9;
const rewardScore2 = 26;
const rewardScore3 = 50;

const addScoresEpic = (action$) =>
  action$.ofType(actionTypes.itemDone)
    .mergeMap(action => {
      const item = action.item;
      const itemScore = calcItemScore(item);
      return goalsRepository.getScore()
        .map(currentScore => {
          let totalScore = currentScore + itemScore;

          if (currentScore < rewardScore1 && totalScore >= rewardScore1) {
            console.log('reward 1 received');
          }

          if (currentScore < rewardScore2 && totalScore >= rewardScore2) {
            console.log('reward 2 received');
          }

          if (currentScore < rewardScore3 && totalScore >= rewardScore3) {
            console.log('reward 3 received');
            totalScore -= rewardScore3;
          }

          return totalScore;
        });
    })
    .mergeMap(totalScore => goalsRepository.saveScore(totalScore))
    .map(actionCreators.dummy());

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
  addScoresEpic
);
