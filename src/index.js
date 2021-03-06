import React from 'react'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';
import './index.css';

function render() {
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
}

render();
registerServiceWorker();
