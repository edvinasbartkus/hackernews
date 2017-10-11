import React from 'react';
import ReactDOM from 'react-dom';
import ItemsList from './../../components/ItemsList/Component';

it('renders ItemsList without crashing', () => {
  const items = [
    { url: 'https://google.com', title: 'Google', by: 'Ed' }
  ];

  const div = document.createElement('div');
  ReactDOM.render(<ItemsList items={items} dispatch={jest.fn()} />, div);
});
