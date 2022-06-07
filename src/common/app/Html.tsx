const Html = ({ assets, jsAssets, cssAssets, children, title }: { assets: any, jsAssets: any, cssAssets: any, children: any, title: string }) => {
    const JsAssets = jsAssets && typeof jsAssets !== "string" ? jsAssets : () => null;
    const CssAssets = cssAssets && typeof cssAssets !== "string" ? cssAssets : () => null;
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href="favicon.ico" />
            <title>{title}</title>
            <CssAssets />
        </head>
        <body>
        <noscript
            dangerouslySetInnerHTML={{
                __html: `<b>Enable JavaScript to run this app.</b>`
            }}
        />
        {children}
        <script
            dangerouslySetInnerHTML={{
                __html: `assetManifest = ${JSON.stringify(assets)};`
            }}
        />
        </body>
        <JsAssets />
        </html>
    );
};

export default Html;
