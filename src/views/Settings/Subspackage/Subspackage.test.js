import React from 'react';
import ReactDOM from 'react-dom';
import Subspackage from './Subspackage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Subspackage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
