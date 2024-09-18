import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { firebaseApp } from './firebase/config';
import Context, { FirebaseContext } from './Context/FirebaseContext';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebaseApp }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
