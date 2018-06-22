import React from 'react';
import ReactDOM from 'react-dom';
import Aboutus from './Aboutus';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Aboutus />, div);
  ReactDOM.unmountComponentAtNode(div);
});
