import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import rootReducer from '../Reducers/RootReducer';
import Config from '../Config/DebugSettings';
import R from 'ramda';
import Reactotron from 'reactotron';
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersist from '../Config/ReduxPersist';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../Epics';

// the logger master switch
const USE_LOGGING = Config.reduxLogging;

// silence these messages
const LOGGING_TYPE_BLACKLIST = [];
// creat the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, LOGGING_TYPE_BLACKLIST))
});

let middleware = [];

middleware.push(createEpicMiddleware(rootEpic));

// Don't ship these
if (__DEV__) {
  middleware.push(logger);
}

// a function which can create our store and auto-persist the data
export default () => {
  let store = {};

  // Add rehydrate enhancer if ReduxPersist is active
  if (ReduxPersist.active) {
    const enhancers = compose(
      applyMiddleware(...middleware),
      Reactotron.storeEnhancer(),
      autoRehydrate()
    );

    store = createStore(
      rootReducer,
      enhancers
    );

    // configure persistStore and check reducer version number
    RehydrationServices.updateReducers(store);
  } else {
    const enhancers = compose(
      applyMiddleware(...middleware),
      Reactotron.storeEnhancer()
    );

    store = createStore(
      rootReducer,
      enhancers
    );
  }

  return store;
};
