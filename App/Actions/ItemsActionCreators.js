import * as types from './Types';
import itemsRepository from '../Repositories/ItemsRepository';

export const addItem = (item) => (dispatch, getState) => {
  itemsRepository.addItem(item);
  dispatch({ type: types.itemAdded, item });
};
