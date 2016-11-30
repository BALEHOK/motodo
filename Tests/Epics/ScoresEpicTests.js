import test from 'ava';
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

test.only('score test', t => {
  scoresRepoMock.getScore = () => Observable.of(2);
  const action$ = ActionsObservable.of(itemsActionCreators.markDone({time: 1, importance: 0}));

  return scoresEpic(action$)
    .subscribe(() => t.pass());
});
