import * as types from './Types';

export const fetchItems = (date) =>
  ({ type: types.fetchItems, date });
