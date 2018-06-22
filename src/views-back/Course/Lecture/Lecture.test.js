import React from 'react';
import ReactDOM from 'react-dom';
import Lecture from './Lecture';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Lecture />, div);
  ReactDOM.unmountComponentAtNode(div);
});
