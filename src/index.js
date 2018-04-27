import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import Reducer from './store/reducers/reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));

let app = <Provider store={store}>
  <BrowserRouter basename="/react/book-finder">
    <App />
  </BrowserRouter>
</Provider>

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
