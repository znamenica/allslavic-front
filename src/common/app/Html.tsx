const Html = ({ jsAssets, cssAssets, children, title }: { jsAssets: any, cssAssets: any, children: any, title: string }) => {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href="favicon.ico" />
            <link rel="stylesheet" href={cssAssets} />
            <title>{title}</title>
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
                __html: jsAssets
            }}
        />
        </body>
        </html>
    );
};

export default Html;
