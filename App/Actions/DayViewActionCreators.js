import * as types from './Types';

export const fetchItems = (date = new Date()) =>
  ({ type: types.fetchItems, date });
