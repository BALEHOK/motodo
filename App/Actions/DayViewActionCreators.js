import * as actions from './Actions';

export const fetchItems = (date = new Date()) =>
  ({ type: actions.fetchItems, date })
