import * as types from './Types';

export const addItem = (item) => ({ type: types.itemAdded, item });

export const deleteItem = (itemId) => ({type: types.itemDelete, itemId});

export const markDone = (itemId) => ({type: types.itemDone, itemId});
