import * as types from './Types';

export const dummy = () => ({ type: types.dummy });

export const startup = () => ({ type: types.startup });
export const setDate = (date) => ({ type: types.setDate, date});

// DayView
export const goToNextDay = () => ({ type: types.goToNextDay });
export const goToPreviousDay = () => ({ type: types.goToPreviousDay });

export const fetchItems = () => ({ type: types.fetchItems });
export const itemsFetched = (items) => ({ type: types.itemsFetched, items });
export const itemAdded = (item) => ({ type: types.dayViewAddItem, item });

// Goals
export const saveGoals = (goals) => ({type: types.goalsChanged, goals})
