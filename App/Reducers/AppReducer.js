import Reducer from './BaseReducer';
import * as types from '../Actions/Types';
import dateTimeService from '../Services/DateTimeService';

function getTodayDate() {
  return new Date(new Date().toDateString());
}

class AppReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = {
      date: getTodayDate(),
      view: 'day'
    };

    this.actionMap = {
      [types.startup]: 'startup',
      [types.goToNextDay]: 'goToNextDay',
      [types.goToPreviousDay]: 'goToPreviousDay',
    };
  }

  startup() {
    return Object.assign({}, this.defaultState, {
      date: getTodayDate()
    });
  }

  goToNextDay(state) {
    return Object.assign({}, state, dateTimeService.addDay(state.date));
  }

  goToPreviousDay(state) {
    return Object.assign({}, state, dateTimeService.addDay(state.date, -1));
  }
}

export default new AppReducer().getReducerFn();
