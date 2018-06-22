import React from 'react';
import ReactDOM from 'react-dom';
import Eventslist from './Eventslist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Eventslist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
