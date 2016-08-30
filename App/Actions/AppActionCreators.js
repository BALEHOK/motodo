import * as types from './Types';

export const startup = () => ({ type: types.startup });
export const goToNextDay = () => ({ type: types.goToNextDay });
export const goToPreviousDay = () => ({ type: types.goToPreviousDay });
