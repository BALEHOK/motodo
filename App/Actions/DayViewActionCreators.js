import * as types from './Types';
import itemsRepository from '../Repositories/ItemsRepository';

export const fetchItems = (date) => (dispatch) => {
  var items = itemsRepository.getDayItems(date);

  dispatch({ type: types.itemsFetched, items });
};
