import React from 'react';
import ReactDOM from 'react-dom';
import Pending from './Pending';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pending />, div);
  ReactDOM.unmountComponentAtNode(div);
});
