import test from 'ava';
import sinon from 'sinon';
import { ActionsObservable } from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import scoresEpic from '../../App/Epics/ScoresEpic';
import * as appActionCreators from '../../App/Actions/AppActionCreators';
import * as itemsActionCreators from '../../App/Actions/ItemsActionCreators';

import { Dict } from '../../App/Repositories/SQL/Tables';

import goalsRepoMock from '../Repositories/GoalsRepository';
import dictRepoMock from '../Repositories/DictRepository';
import alertServiceMock from '../Services/AlertService';

const item = {time: 3, importance: 1};
const testGoals = {
  goal1: 'test goal 1',
  goal2: 'test goal 2',
  goal3: 'test goal 3'
};
let alertSpy;
let storeMock, storeSpy;

test.before(() => {
  goalsRepoMock.getGoals = function() {
    return Observable.of(testGoals);
  };

  dictRepoMock.totalScore = 0;
  dictRepoMock.saveNum = function() {
    return Observable.of(true);
  };

  dictRepoMock.getNum = function() {
    return Observable.of(this.totalScore);
  };

  alertSpy = sinon.spy(alertServiceMock, 'alert');

  storeMock = { dispatch: () => {}, getState: () => ({}) };
  storeSpy = sinon.spy(appActionCreators, 'goalReached');
});

test.afterEach(() => {
  alertSpy.reset();
  storeSpy.reset();
});

test('no alert if no reward received', t => {
  dictRepoMock.totalScore = 2;
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.false(alertSpy.called));
});

test('should rise reward 1 action', riseRewardActionMacro, 8, 1);
test('should rise reward 2 action', riseRewardActionMacro, 25, 2);
test('should rise reward 3 action', riseRewardActionMacro, 49, 3);

test('should alert reward 1', showRewardMessageMacro, 1, 'Your reward is: ' + testGoals.goal1);
test('should alert reward 2', showRewardMessageMacro, 2, 'Your reward is: ' + testGoals.goal2);
test('should alert reward 3', showRewardMessageMacro, 3, 'Your reward is: ' + testGoals.goal3);

test('should fetch reward from state if possible', t => {
  sinon.stub(storeMock, 'getState')
    .returns({goals: testGoals});
  const getGoalsSpy = sinon.spy(goalsRepoMock, 'getGoals');

  const action$ = ActionsObservable.of(appActionCreators.goalReached(2));
  return scoresEpic(action$, storeMock)
    .subscribe(() => {
      t.true(alertSpy.calledWith('Your reward is: ' + testGoals.goal2));
      t.false(getGoalsSpy.called);
    });
});

test('scores are reseted after getting reward 3', t => {
  let spy = sinon.spy(dictRepoMock, 'saveNum');
  dictRepoMock.totalScore = 49;
  
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$, storeMock)
    .subscribe(() => t.true(spy.calledWith(Dict.ids.scores, 2)));
});

function riseRewardActionMacro(t, totalScore, goalNum) {
  dictRepoMock.totalScore = totalScore;
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$, storeMock)
    .subscribe(() => t.true(storeSpy.calledWith(goalNum)));
}

function showRewardMessageMacro(t, goalNum, message) {
  const action$ = ActionsObservable.of(appActionCreators.goalReached(goalNum));
  return scoresEpic(action$, storeMock)
    .subscribe(() => t.true(alertSpy.calledWith(message)));
}
