import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import '@fontsource/poppins/300';
import '@fontsource/poppins/400';
import '@fontsource/poppins/500';
import '@fontsource/poppins/600';
import '@fontsource/poppins/700';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);