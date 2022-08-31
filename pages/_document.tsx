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
        <link rel="apple-touch-icon" href="/icon_180x180.png" />
        <link rel="icon" type="image/png" href="/icon_192x192.png" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <body>
        <NoscriptGTM gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
