import test from 'ava';
import sinon from 'sinon';
import { ActionsObservable } from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import scoresEpic from '../../App/Epics/ScoresEpic';
import * as itemsActionCreators from '../../App/Actions/ItemsActionCreators';

import scoresRepoMock from '../Repositories/GoalsRepository';

test.before(() =>
  scoresRepoMock.saveScore = () => {
    return Observable.of(true);
  }
);

test('no reword received', t => {
  scoresRepoMock.getScore = () => Observable.of(2);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone({time: 1, importance: 0}));

  return scoresEpic(action$)
    .subscribe(() => t.pass());
});

test('reword 1 received', t => {
  scoresRepoMock.getScore = () => Observable.of(8);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone({time: 1, importance: 0}));

  return scoresEpic(action$)
    .subscribe(() => t.pass());
});

test('reword 2 received', t => {
  scoresRepoMock.getScore = () => Observable.of(25);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone({time: 1, importance: 0}));

  return scoresEpic(action$)
    .subscribe(() => t.pass());
});

test('reword 3 received', t => {
  let spy = sinon.spy(scoresRepoMock, 'saveScore');
  scoresRepoMock.getScore = () => Observable.of(49);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone({time: 3, importance: 1}));

  return scoresEpic(action$)
    .subscribe(() => t.true(spy.calledWith(2)));
});
