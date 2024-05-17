import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css';
import rootStore from './store/rootStore';
import { Provider } from 'react-redux';
import { getProduct } from './store/productStore';
import ProductAnalytics from './views/ProductAnalytics';
import Header from './components/Header';

function run() {
  rootStore.dispatch(getProduct());
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={rootStore}>
      <div className="w-full flex flex-col columns-1">
        <Header />
        <ProductAnalytics />
      </div>
    </Provider>
  );
}
run();
