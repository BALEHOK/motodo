import test from 'ava';
import sinon from 'sinon';
import { ActionsObservable } from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import scoresEpic from '../../App/Epics/ScoresEpic';
import * as itemsActionCreators from '../../App/Actions/ItemsActionCreators';

import goalsRepoMock from '../Repositories/GoalsRepository';
import alertServiceMock from '../Services/AlertService';

const item = {time: 3, importance: 1};
const testGoals = {
  goal1: 'test goal 1',
  goal2: 'test goal 2',
  goal3: 'test goal 3'
};
let alertSpy;

test.before(() => {
  goalsRepoMock.totalScore = 0;

  goalsRepoMock.getGoals = function() {
    return Observable.of(testGoals);
  };

  goalsRepoMock.saveScore = function() {
    return Observable.of(true);
  };

  goalsRepoMock.getScore = function() {
    return Observable.of(this.totalScore);
  };

  alertSpy = sinon.spy(alertServiceMock, 'alert');
});

test.afterEach(() => alertSpy.reset());

test('no alert if no reward received', t => {
  goalsRepoMock.totalScore = 2;
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.false(alertSpy.called));
});

function rewardsMacro(t, totalScore, message) {
  goalsRepoMock.totalScore = totalScore;
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.true(alertSpy.calledWith(message)));
}

test.only('should alert reward 1', rewardsMacro, 8, 'Your reward is: ' + testGoals.goal1);
test.only('should alert reward 2', rewardsMacro, 25, 'Your reward is: ' + testGoals.goal2);
test.only('should alert reward 3', rewardsMacro, 49, 'Your reward is: ' + testGoals.goal3);

test('scores are reseted after getting reward 3', t => {
  let spy = sinon.spy(goalsRepoMock, 'saveScore');
  goalsRepoMock.getScore = () => Observable.of(49);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.true(spy.calledWith(2)));
});
