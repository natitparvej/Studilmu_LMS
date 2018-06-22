import React from 'react';
import ReactDOM from 'react-dom';
import Students from './Students';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Students />, div);
  ReactDOM.unmountComponentAtNode(div);
});
