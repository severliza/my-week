import React from 'react';
import ReactDOM from 'react-dom';
import Week from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Week />, div);
  ReactDOM.unmountComponentAtNode(div);
});
