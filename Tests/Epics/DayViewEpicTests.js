import test from 'ava';
import { ActionsObservable } from 'redux-observable';
import dayViewEpic from '../../App/Epics/DayViewEpic';
import * as actionCreators from '../../App/Actions/AppActionCreators';

test('watches for the right action', t => {
  const output = [];
  const action$ = ActionsObservable.of(actionCreators.startup());
  dayViewEpic.fetchItemsEpic(action$)
    .subscribe(x => output.push(x));
console.log(output, actionCreators.fetchItems());
  t.deepEqual(output, [actionCreators.fetchItems()]);
});
