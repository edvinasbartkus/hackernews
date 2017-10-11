import React from 'react';
import ReactDOM from 'react-dom';
import Root from './../../components/Root';

jest.mock('./../../reducers/configureStore');

import * as store from './../../reducers/configureStore';
store.configureStore = jest.fn((cb) => {
  const store = {
    getState: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn()
  }
  return { store: store, persistor: {} }
});

it('renders Root without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
});
