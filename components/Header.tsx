import Head from "next/head";

export const Header = () => {
  return (
    <header className="item_header">
      <Head>
        <link href="/logo.png" as="image" rel="preload" />
      </Head>
      <div className="item_logo">
        <img src="/logo.png" alt={process.env.NEXT_PUBLIC_STORE_DISPLAY_NAME} />
      </div>
    </header>
  );
};
