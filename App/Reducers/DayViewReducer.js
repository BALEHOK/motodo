import Reducer from './BaseReducer';
import * as types from '../Actions/Types';

import DayItemModel from '../Models/DayItemModel';

function createDayItem(name) {
  const item = new DayItemModel();
  item.name = name;

  return item;
}

const items = [
  createDayItem('First Title'),
  createDayItem('Second Title'),
  createDayItem('Third Title'),
  createDayItem('Fourth Title'),
  createDayItem('Fifth Title')
];

class DayViewReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = { items: [] };

    this.actionMap = {
      [types.fetchItems]: 'fetchItems'
    };
  }

  fetchItems(state, action) {
    return Object.assign({}, state, {
      items: items
    });
  }
}

export default new DayViewReducer().getReducerFn();
