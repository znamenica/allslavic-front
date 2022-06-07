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
import Html from "../common/app/Html";

const store = configureAppStore((window as any).__PRELOADED_STATE__);

const cssLinksFromAssets = (assets: any, entrypoint: any) => {
    return assets[entrypoint] ? assets[entrypoint].css ?
        assets[entrypoint].css.map((asset: any) =>
            () => <link rel="stylesheet" href={asset} />
        ) : null : null;
};

const jsScriptTagsFromAssets = (assets: any, entrypoint: any, extra = '') => {
    return assets[entrypoint] ? assets[entrypoint].js ?
        assets[entrypoint].js.map((asset: any) =>
            () => <script src={`${asset}${extra}`}></script>
        ) : null : null;
};

const BaseApp = () => {
    useSSR((window as any).initialI18nStore, (window as any).initialLanguage);
    // const [isPending] = useTransition();
    const assets = (window as any).assetManifest;
    const assetsObj = JSON.parse(assets);
    console.log(cssLinksFromAssets(assetsObj, 'client'));
    return (
        <Html
            assets={assetsObj}
            cssAssets={cssLinksFromAssets(assetsObj, 'client')}
            jsAssets={jsScriptTagsFromAssets(assetsObj, 'client', ' defer crossorigin')}
            title="тест"
        >
            <Suspense fallback={<div>Still loading i18n...</div>}>
            {/*    {isPending ? " Загрузка..." : (*/}
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </Suspense>
        </Html>
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
