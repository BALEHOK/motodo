import { take } from 'redux-saga/effects';
import Types from '../Actions/Actions';

// process STARTUP actions
export function * watchStartup () {
  yield take(Types.startup);
}
