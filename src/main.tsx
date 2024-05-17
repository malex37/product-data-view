import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css';
import rootStore from './store/rootStore';
import { Provider } from 'react-redux';
import { getProduct } from './store/productStore';

function run() {
  rootStore.dispatch(getProduct());
  ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Provider store={rootStore}>
          HElLO FROM A NEW PROJECT
        </Provider>
      </React.StrictMode>
  );
}
run();
