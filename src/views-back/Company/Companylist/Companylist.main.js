import React from 'react';
import ReactDOM from 'react-dom';
import Companylist from './Companylist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Companylist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
