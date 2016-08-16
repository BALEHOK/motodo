import * as types from './Types';
import itemsRepository from '../Repositories/ItemsRepository';

export const fetchItems = (date) => (dispatch, getState) => {
  var items = itemsRepository.getDayItems(date);

  dispatch({ type: types.itemsFetched, items });
};
