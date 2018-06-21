import React from 'react';
import ReactDOM from 'react-dom';
import Groupinfo from './Groupinfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Groupinfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
