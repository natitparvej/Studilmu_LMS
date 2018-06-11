import React from 'react';
import ReactDOM from 'react-dom';
import Instructor from './Instructor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Instructor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
