import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage;

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            });

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head></Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                ></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-6NB2QTQ381"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'G-6NB2QTQ381');`,
                    }}
                ></script>

                {/* <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/3299678.js"></script>
                <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" async></script> */}

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
