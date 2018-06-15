import React from 'react';
import ReactDOM from 'react-dom';
import Sabpackage from './Sabpackage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sabpackage/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
