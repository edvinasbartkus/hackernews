import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';

// Reducers
import itemsReducer from './items/reducer';

// Store initiator
export function configureStore(onCompletion) {
  const store = createStore(
    applyMiddleware(thunk),
    autoRehydrate()
  );

  const persistor = persistStore(store, { storage: localForage }, onCompletion);
  return { store, persistor };
}