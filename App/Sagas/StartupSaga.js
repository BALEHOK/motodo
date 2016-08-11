import { take } from 'redux-saga/effects';
import * as types from '../Actions/Types';

// process STARTUP actions
export function * watchStartup () {
  yield take(types.startup);
}
