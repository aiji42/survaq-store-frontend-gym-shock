import { Html, Head, Main, NextScript } from "next/document";
import { GTM, NoscriptGTM } from "@/components/gtm";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
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
