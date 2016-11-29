import test from 'ava';
import { ActionsObservable } from 'redux-observable';
import dayViewEpic from '../../App/Epics/DayViewEpic';
import * as actionCreators from '../../App/Actions/AppActionCreators';

test('shoul fetch items on startup', t => {
  const output = [];
  const action$ = ActionsObservable.of(actionCreators.startup());
  dayViewEpic(action$)
    .subscribe(x => output.push(x));

  t.deepEqual(output, [actionCreators.fetchItems()]);
});
