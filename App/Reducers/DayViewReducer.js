import Reducer from './BaseReducer';
import * as types from '../Actions/Types';

class DayViewReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = { items: [] };

    this.actionMap = {
      [types.itemsFetched]: 'itemsFetched'
    };
  }

  itemsFetched(state, action) {
    return Object.assign({}, state, {
      items: action.items
    });
  }
}

export default new DayViewReducer().getReducerFn();
