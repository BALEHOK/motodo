import * as types from './Types';
import itemsRepository from '../Repositories/ItemsRepository';
import { fetchItems } from './DayViewActionCreators';

export const addItem = (item) => (dispatch, getState) => {
  itemsRepository.addItem(item);
  dispatch({ type: types.itemAdded, item });

  var appState = getState().app;
  if (appState.view === 'day') {
    dispatch(fetchItems(appState.date));
  }
};
