import Reducer from './BaseReducer';
import * as types from '../Actions/Types';

import DayItemModel from '../Models/DayItemModel';

function createDayItem(name) {
  const item = new DayItemModel();
  item.name = name;

  return item;
}

function getItems(date) {
  var dateString = date.toDateString();
  return [
    createDayItem(`First Title (${dateString})`),
    createDayItem(`Second Title (${dateString})`),
    createDayItem(`Third Title (${dateString})`),
    createDayItem(`Fourth Title (${dateString})`),
    createDayItem(`Fifth Title (${dateString})`)
  ];
}

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
      items: getItems(action.date)
    });
  }
}

export default new DayViewReducer().getReducerFn();
