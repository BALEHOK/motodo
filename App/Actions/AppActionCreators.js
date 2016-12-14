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
export const goalsViewLoaded = () => ({type: types.goalsViewLoaded});
export const goalsChanged = (goals) => ({type: types.goalsChanged, goals});
export const goalsLoaded = (goals) => ({type: types.goalsLoaded, goals});
export const goalReached = (goalNum) => ({type: types.goalReached, goalNum});
