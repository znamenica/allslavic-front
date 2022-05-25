import React, {ReactNode, Suspense, useTransition} from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../common/app/App';
import './index.css';
import { Provider } from 'react-redux';
import configureAppStore from "../common/store";
import "../common/i18n";
import {useSSR} from "react-i18next";
import { ReactStreaming } from 'react-streaming/client'

const store = configureAppStore((window as any).__PRELOADED_STATE__);

const BaseApp = () => {
    useSSR((window as any).initialI18nStore, (window as any).initialLanguage);
    // const [isPending] = useTransition();
    return (
        <>
            <Suspense fallback={<div>Still loading i18n...</div>}>
            {/*    {isPending ? " Загрузка..." : (*/}
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </Suspense>
        </>
    )
};

hydrateRoot(
    document.getElementById('root')!,
    <>
        <BaseApp />
    </>,
);

if (module.hot) {
    module.hot.accept();
}
