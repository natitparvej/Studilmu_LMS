import React from 'react';
import ReactDOM from 'react-dom';
import Contactus from './Contactus';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Contactus />, div);
  ReactDOM.unmountComponentAtNode(div);
});
