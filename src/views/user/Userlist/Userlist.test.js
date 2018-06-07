import React from 'react';
import ReactDOM from 'react-dom';
import Owner from './Owner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Owner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
