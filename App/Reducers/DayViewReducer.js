import Reducer from './BaseReducer';
import * as types from '../Actions/Types';

class DayViewReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = { items: [] };

    this.actionMap = {
      [types.dayViewAddItem]: 'itemAdded',
      [types.itemsFetched]: 'itemsFetched',
      [types.itemDelete]: 'itemDelete',
      [types.itemDone]: 'itemDelete',
    };
  }

  itemAdded(state, action) {
    return Object.assign({}, state, {
      items: [...state.items, action.item]
    });
  }

  itemsFetched(state, action) {
    return Object.assign({}, state, {
      items: action.items
    });
  }

  itemDelete(state, action) {
    var index = state.items.findIndex(i => i.id === action.itemId);
    if (index === -1) {
      return state;
    }

    return Object.assign({}, state, {
      items: [...state.items.slice(0, index), ...state.items.slice(index+1)]
    });
  }
}

export default new DayViewReducer().getReducerFn();
