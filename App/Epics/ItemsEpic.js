import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import itemsRepository from '../Repositories/ItemsRepository';

//не вызываются методы репозитория
const deleteItem = (action$) =>
  action$.ofType(actionTypes.deleteItem)
    .map((action) => itemsRepository.deleteItem(action.itemId));

const markDone = (action$) =>
  action$.ofType(actionTypes.markDone)
    .map((action) => itemsRepository.markDone(action.itemId));


export default combineEpics(deleteItem, markDone);
