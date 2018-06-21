import React from 'react';
import ReactDOM from 'react-dom';
import Grouplist from './Grouplist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Grouplist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
