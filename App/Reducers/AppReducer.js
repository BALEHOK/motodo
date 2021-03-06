import Reducer from './BaseReducer';
import * as types from '../Actions/Types';
import viewTypes from '../Utils/ViewTypes';

function getTodayDate() {
  return new Date(new Date().toDateString());
}

class AppReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = {
      date: getTodayDate(),
      view: viewTypes.day
    };

    this.actionMap = {
      [types.startup]: 'startup',
      [types.setDate]: 'setDate'
    };
  }

  startup() {
    return Object.assign({}, this.defaultState, {
      date: getTodayDate()
    });
  }

  setDate(state, action) {
    return Object.assign({}, state, {date: action.date});
  }
}

export default new AppReducer().getReducerFn();
