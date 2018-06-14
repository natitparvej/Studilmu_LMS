import React from 'react';
import ReactDOM from 'react-dom';
import Sitesetting from './Sitesetting';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sitesetting />, div);
  ReactDOM.unmountComponentAtNode(div);
});
