import React from 'react';
import ReactDOM from 'react-dom';
import Couponslist from './Couponslist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Couponslist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
