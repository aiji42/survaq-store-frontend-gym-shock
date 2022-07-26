import { Html, Head, Main, NextScript } from "next/document";
import { Gtm, NoscriptGTM } from "@/components/Gtm";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <Gtm gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/survaq_logo_180x180.png" />
        <link rel="icon" type="image/png" href="/survaq_logo_192x192.png" />
      </Head>
      <body>
        <NoscriptGTM gtmId="foo" />
        <Main />
        <NextScript />
        <script src="/cart.js" defer />
      </body>
    </Html>
  );
}
