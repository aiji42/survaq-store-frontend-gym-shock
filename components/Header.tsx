import Head from "next/head";

export const Header = () => {
  return (
    <header className="item_header">
      <Head>
        <link href="/logo_black.png" as="image" rel="preload" />
      </Head>
      <div className="item_logo">
        <img src="/logo_black.png" alt="Furez" />
      </div>
    </header>
  );
};
