import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Login, Page404, Page500, Register } from './views/Pages';
import authService from './views/Service/authService.js';

// disable ServiceWorker
//import registerServiceWorker from './registerServiceWorker';
if (!authService.getUser()) {
	console.log('hi');
	ReactDOM.render(<Login />, document.getElementById('root'));
}else{
	ReactDOM.render(<App />, document.getElementById('root'));
}
// disable ServiceWorker
//Api();
