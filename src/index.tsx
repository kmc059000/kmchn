import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
