import Reducer from './BaseReducer';
import * as types from '../Actions/Types';

class AppReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = {
      goal1: '',
      goal2: '',
      goal3: ''
    };

    this.actionMap = {
      [types.goalsLoaded]: 'updateGoals'
    };
  }

  updateGoals(state, action) {
    return {...action.goals};
  }
}

export default new AppReducer().getReducerFn();
