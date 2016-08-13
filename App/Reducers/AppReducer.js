import Reducer from './BaseReducer';
import * as types from '../Actions/Types';

function getTodayDate() {
  return new Date(new Date().toDateString());
}

class AppReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = { date: getTodayDate() };

    this.actionMap = {
      [types.startup]: 'startup'
    };
  }

  startup() {
    return Object.assign({}, this.defaultState, {
      date: getTodayDate()
    });
  }
}

export default new AppReducer().getReducerFn();
