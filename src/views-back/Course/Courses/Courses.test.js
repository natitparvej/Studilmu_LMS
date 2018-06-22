import React from 'react';
import ReactDOM from 'react-dom';
import Courses from './Courses';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Courses />, div);
  ReactDOM.unmountComponentAtNode(div);
});
