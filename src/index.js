import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/vendor_assets/css/bootstrap/bootstrap.css';

import './assets/vendor_assets/css/fontawesome.css';

import './assets/vendor_assets/css/line-awesome.min.css';
import './assets/theme_assets/sass/style.scss';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
