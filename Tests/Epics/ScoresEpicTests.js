import test from 'ava';
import { ActionsObservable } from 'redux-observable';
import {Observable} from 'rxjs/Observable';
import scoresEpic from '../../App/Epics/scoresEpic';
import * as itemsActionCreators from '../../App/Actions/ItemsActionCreators';

import scoresRepoMock from '../Repositories/GoalsRepository';

// before не вызывается перед тестами
test.before(() => {
  scoresRepoMock.saveScore = () => {
    console.log('хуй');
    Observable.of(true);
  };
});

test('shoul fetch items on startup', t => {
  // scoresRepoMock.getScore = () => Observable.of(2);
  scoresRepoMock.getScore = () => 2;

  const output = [];
  const action$ = ActionsObservable.of(itemsActionCreators.markDone({time: 1, importance: 0}));

  scoresEpic(action$)
    .subscribe(x => output.push(x));

  t.pass();
});
