import immutablePersistenceTransform from '../Store/ImmutablePersistenceTransform';
import { persistentStoreBlacklist } from '../Reducers/RootReducer';
import { AsyncStorage } from 'react-native';

const REDUX_PERSIST = {
  active: false,
  reducerVersion: '1',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: persistentStoreBlacklist,
    transforms: [immutablePersistenceTransform]
  }
};

export default REDUX_PERSIST;
