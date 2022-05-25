import express from 'express';
import React, {Suspense} from 'react';
import { renderToString } from 'react-dom/server';
import {Provider} from "react-redux";
import { StaticRouter } from 'react-router-dom/server';
import App from '../common/app/App';
import configureAppStore from "../common/store";
import Helmet from "react-helmet";
import i18n from "../common/i18n";
import {I18nextProvider} from "react-i18next";
import Backend from "i18next-http-backend";
import i18nextMiddleware from 'i18next-http-middleware';
import * as path from "path";
import * as fs from "fs";
import * as process from "process";

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

interface Request extends express.Request {
    i18n: any;
}

export const renderApp = (req: Request, res: express.Response) => {
    // Compile an initial state
    const preloadedState = {  };

    // Create a new Redux store instance
    const store = configureAppStore(preloadedState);

    const markup = renderToString(
        <Suspense fallback={"Загрузка"}>
            <I18nextProvider i18n={req.i18n}>
                <Provider store={store}>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </Provider>
            </I18nextProvider>
        </Suspense>
    );
    const helmet = Helmet.renderStatic();
    console.log(helmet.title.toString(), helmet.meta.toString());
    const initialLanguage = req.i18n?.languages && req.i18n?.languages[0];

    const initialI18nStore: any = {};
    const usedNamespaces = req.i18n?.reportNamespaces?.getUsedNamespaces();

    req.i18n?.languages?.forEach((language: string) => {
        initialI18nStore[language] = {};

        usedNamespaces.forEach((namespace: string) => {
            initialI18nStore[language][namespace] =
                req.i18n.services.resourceStore.data[language][namespace];
        });
    });

    const html =
            // prettier-ignore
            `<!doctype html>
    <html lang="">
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${cssLinksFromAssets(assets, 'client')}
        <script>
          window.initialI18nStore = JSON.parse('${JSON.stringify(initialI18nStore)}');
          window.initialLanguage = '${initialLanguage}';
        </script>
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
  </html>`;

    return { html, redirect: '' };
};

const index = express();

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('public');

i18n
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
        {
            initImmediate: false,
            debug: false,
            // preload: ['en', 'ru'],
            // ns: ['translations'],
            // defaultNS: 'translations',
            backend: {
            //     loadPath: `${appSrc}/locales/{{lng}}/{{ns}}.json`,
            //     addPath: `${appSrc}/locales/{{lng}}/{{ns}}.missing.json`,
            },
        },
        () => {
            index.disable('x-powered-by')
                .use(i18nextMiddleware.handle(i18n))
                // .use('/locales', express.static(`${appSrc}/locales`))
                .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
                .get('/*', (req: express.Request, res: express.Response) => {
                    console.log("Send");
                    const {html = '', redirect = ''} = renderApp(req as Request, res);
                    if (redirect) {
                        res.redirect(redirect);
                    } else {
                        res.send(html);
                    }
                });
        });

export default index;