import { combineEpics } from 'redux-observable';

import * as actionTypes from '../Actions/Types';
import * as actionCreators from '../Actions/AppActionCreators';
import itemsRepository from '../Repositories/ItemsRepository';

const deleteItem = (action$) =>
  action$.ofType(actionTypes.itemDelete)
    .mergeMap(action => itemsRepository.deleteItem(action.itemId))
    .mapTo(actionCreators.dummy());

const markDone = (action$) =>
  action$.ofType(actionTypes.itemDone)
    .mergeMap(action => itemsRepository.markDone(action.itemId))
    .mapTo(actionCreators.dummy());


export default combineEpics(deleteItem, markDone);
