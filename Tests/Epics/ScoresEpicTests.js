import test from 'ava';
import sinon from 'sinon';
import { ActionsObservable } from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import scoresEpic from '../../App/Epics/ScoresEpic';
import * as itemsActionCreators from '../../App/Actions/ItemsActionCreators';

import scoresRepoMock from '../Repositories/GoalsRepository';
import alertServiceMock from '../Services/AlertService';

const item = {time: 3, importance: 1};
let alertSpy;

test.before(() => {
  scoresRepoMock.totalScore = 0;

  scoresRepoMock.saveScore = function() {
    return Observable.of(true);
  };

  scoresRepoMock.getScore = function() {
    return Observable.of(this.totalScore);
  };

  alertSpy = sinon.spy(alertServiceMock, 'alert');
});

test.afterEach(() => alertSpy.reset());

test('no alert if no reward received', t => {
  scoresRepoMock.totalScore = 2;
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.false(alertSpy.called));
});

function rewardsMacro(t, totalScore, message) {
  scoresRepoMock.totalScore = totalScore;
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.true(alertSpy.calledWith(message)));
}

test('should alert reward 1', rewardsMacro, 8, 'Your reward is: reward 1');
test('should alert reward 2', rewardsMacro, 25, 'Your reward is: reward 2');
test('should alert reward 3', rewardsMacro, 49, 'Your reward is: reward 3');

test('scores are reseted after getting reward 3', t => {
  let spy = sinon.spy(scoresRepoMock, 'saveScore');
  scoresRepoMock.getScore = () => Observable.of(49);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone(item));

  return scoresEpic(action$)
    .subscribe(() => t.true(spy.calledWith(2)));
});
