import React from 'react';
import ReactDOM from 'react-dom';
import Courselist from './Courselist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Courselist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
