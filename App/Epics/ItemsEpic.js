import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import itemsRepository from '../Repositories/ItemsRepository';

//не вызываются методы репозитория
const deleteItem = (action$) =>
  action$.ofType(actionTypes.itemDelete)
    .do((action) => {
      itemsRepository.deleteItem(action.itemId);
    })
    .mapTo(actionCreators.dummy());

const markDone = (action$) =>
  action$.ofType(actionTypes.itemDone)
    .do((action) => itemsRepository.markDone(action.itemId))
    .mapTo(actionCreators.dummy());


export default combineEpics(deleteItem, markDone);
