import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './reducers/configureStore';

const store = configureStore();

function render() {
  ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}


render();
registerServiceWorker();
