import Reducer from './BaseReducer';
import itemsRepository from '../Repositories/ItemsRepository';
import * as types from '../Actions/Types';

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
      items: itemsRepository.getDayItems(action.date)
    });
  }
}

export default new DayViewReducer().getReducerFn();
