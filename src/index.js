import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Root from './Root';
import App from './App';
import reducer from './reducers/index';

import { createStore } from 'redux';

let store = createStore(reducer);
ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();
