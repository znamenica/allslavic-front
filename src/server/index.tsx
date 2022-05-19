import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {Provider} from "react-redux";
import { StaticRouter } from 'react-router-dom/server';
import App from '../common/app/App';
import configureAppStore from "../common/store";
import Helmet from "react-helmet";

let assets: any;

const syncLoadAssets = () => {
    assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const cssLinksFromAssets = (assets: any, entrypoint: any) => {
    return assets[entrypoint] ? assets[entrypoint].css ?
        assets[entrypoint].css.map((asset: any) =>
            `<link rel="stylesheet" href="${asset}">`
        ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets: any, entrypoint: any, extra = '') => {
    return assets[entrypoint] ? assets[entrypoint].js ?
        assets[entrypoint].js.map((asset: any) =>
            `<script src="${asset}"${extra}></script>`
        ).join('') : '' : '';
};

export const renderApp = (req: express.Request, res: express.Response) => {
    // Compile an initial state
    const preloadedState = {  };

    // Create a new Redux store instance
    const store = configureAppStore(preloadedState);

    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </Provider>
    );
    const helmet = Helmet.renderStatic();

    const html =
            // prettier-ignore
            `<!doctype html>
    <html lang="">
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
  </html>`;

    return { html, redirect: '' };
};

const index = express()
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .get('/*', (req: express.Request, res: express.Response) => {
        const { html = '', redirect = '' } = renderApp(req, res);
        if (redirect) {
            res.redirect(redirect);
        } else {
            res.send(html);
        }
    });

export default index;