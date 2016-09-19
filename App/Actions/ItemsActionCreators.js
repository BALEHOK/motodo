import * as types from './Types';
import itemsRepository from '../Repositories/ItemsRepository';
import { fetchItems } from './AppActionCreators';

export const addItem = (item) => (dispatch, getState) => {
  itemsRepository.addItem(item);
  dispatch({ type: types.itemAdded, item });

  var appState = getState().app;
  if (appState.view === 'day') {
    dispatch(fetchItems());
  }
};

export const deleteItem = (itemId) => ({type: types.itemDelete, itemId});

export const markDone = (itemId) => ({type: types.itemDone, itemId});
