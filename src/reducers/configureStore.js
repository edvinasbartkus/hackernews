import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';

// Reducers
import itemsReducer from './items/reducer';

// Store initiator
export function configureStore(onCompletion) {
  const store = createStore(
    itemsReducer,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );

  const persistor = persistStore(store, { storage: localForage }, onCompletion).purge();
  return { store, persistor };
}