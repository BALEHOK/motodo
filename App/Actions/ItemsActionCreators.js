import * as types from './Types';

export const addItem = (item) =>
  ({ type: types.addItem, item });
