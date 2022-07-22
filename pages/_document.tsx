import { Html, Head, Main, NextScript } from "next/document";
import { GTM } from "@/components/gtm";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <GTM gtmId="foo" />
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/cart.js" defer />
      </body>
    </Html>
  );
}
