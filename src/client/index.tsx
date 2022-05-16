import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../common/app/App';
import './index.css';
import { Provider } from 'react-redux';
import configureAppStore from "../common/store";

const store = configureAppStore((window as any).__PRELOADED_STATE__);

hydrateRoot(
    document.getElementById('root')!,
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,

);

if (module.hot) {
    module.hot.accept();
}
