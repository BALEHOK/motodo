var undefined;

export default class Reducer {
  actionMap = {}

  defaultState = undefined
  // defaultFn = undefined

  getReducerFn(){
    var reducer = this;

    if (this.defaultFn) {
      return (state = reducer.defaultState, action) => {
        var handlerName = reducer.actionMap[action.type];
        if (!!handlerName) {
          return reducer[handlerName](state, action);
        }

        return reducer.defaultFn(state, action);
      }
    }

    return (state = reducer.defaultState, action) => {
      var handlerName = reducer.actionMap[action.type];
      if (!!handlerName) {
        return reducer[handlerName](state, action);
      }

      return state;
    }
  }
}
