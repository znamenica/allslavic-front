import express from 'express';
import React, {Suspense, useTransition} from 'react';
import {renderToPipeableStream, renderToString} from 'react-dom/server';
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
import { renderToStream } from 'react-streaming/server'

let assets: any;

const index = express();

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src');

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

interface Request {
    i18n: any;
}
console.log(index);

export const renderApp = (req: any, res: any) => {
    // Compile an initial state
    const preloadedState = {  };

    // Create a new Redux store instance
    const store = configureAppStore(preloadedState);

    const BaseApp = () => {
        // const [isPending] = useTransition();
        // return isPending ? <>loading</> : (
            return (<I18nextProvider i18n={req.i18n}>
                <Provider store={store}>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </Provider>
            </I18nextProvider>
        );
    }

    // try {
    //     const a = await renderToStream( <BaseApp />, {userAgent: "Mozilla 5.0"})
    //     console.log(a);
        // ✅ Page shell succesfully rendered and is ready in the stream buffer.
    // } catch(err) {
    //     console.log(err);
        // ❌ Something went wrong while rendering the page shell.
    // }

    const markup = renderToString(
        <Suspense fallback={"Загрузка"}>
            <BaseApp />
        </Suspense>
    );
    // let didError = false;
    // const stream = renderToPipeableStream(
    //     <BaseApp />,
    //     {
    //         onShellReady() {
    //             // The content above all Suspense boundaries is ready.
    //             // If something errored before we started streaming, we set the error code appropriately.
    //             res.statusCode = didError ? 500 : 200;
    //             res.setHeader('Content-type', 'text/html');
    //             stream.pipe(res);
    //         },
    //         onShellError(error) {
    //             // Something errored before we could complete the shell so we emit an alternative shell.
    //             res.statusCode = 500;
    //             res.send(
    //                 '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
    //             );
    //         },
    //         onAllReady() {
    //             // If you don't want streaming, use this instead of onShellReady.
    //             // This will fire after the entire page content is ready.
    //             // You can use this for crawlers or static generation.
    //
    //             // res.statusCode = didError ? 500 : 200;
    //             // res.setHeader('Content-type', 'text/html');
    //             // stream.pipe(res);
    //         },
    //         onError(err) {
    //             didError = true;
    //             console.error(err);
    //         },
    //     }
    // );
    // setTimeout(() => stream.abort(), 2000);
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

i18n
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
        {
            // initImmediate: false,
            debug: false,
            preload: ['en', 'ru'],
            ns: ['translation'],
            defaultNS: 'translation',
            backend: {
                loadPath: `${appSrc}/locales/{{lng}}/{{ns}}.json`,
                addPath: `${appSrc}/locales/{{lng}}/{{ns}}.missing.json`,
            },
        },
        () => {
            index
                .disable('x-powered-by')
                .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
                .use(i18nextMiddleware.handle(i18n))
                .use('/locales', express.static(`${appSrc}/locales`))
                .get('/*', (req: any, res: any) => {
                    console.log("Send");
                    const {html = '', redirect = ''} =
                    renderApp(req as Request, res);
                    res.status(200).send(html);
                    // if (redirect) {
                    //     res.redirect(redirect);
                    // } else {
                    //     res.status(200).send(html);
                    // }
                });
        }).catch(e => console.log("Error: ", e));

export default index;