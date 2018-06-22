import React from 'react';
import ReactDOM from 'react-dom';
import Coursecategory from './Coursecategory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Coursecategory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
