import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import itemsReducer from './items/reducer';

// Store initiator
export function configureStore() {
  return createStore(
    applyMiddleware(thunk)
  );
}