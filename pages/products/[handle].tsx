import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { getProductByHandle, Product } from "@/libs/shopify";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:
      process.env.PRODUCT_HANDLES?.split(",").map((handle) => ({
        params: { handle },
      })) ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { product: Product },
  { handle: string }
> = async ({ params }) => {
  const handle = params?.handle;
  if (!handle) throw new Error();

  const product = await getProductByHandle(handle);

  return {
    props: {
      product,
    },
    revalidate: 3600,
  };
};

export const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
}) => {
  return (
    <>
      <Head>
        <title>{product.seo.title || product.title}</title>
        <meta
          name="description"
          content={product.seo.description || product.description}
        />
      </Head>
      <header className="main_header">
        <h1 className="main_title">{product.title}</h1>
      </header>
      <main className="main_content">
        {product.featuredImage && (
          <div className="mv">
            <Image
              priority
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
            />
          </div>
        )}

        <div id="product-component-1658452708280" />
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </main>
      <footer className="main_footer">ここにフッター</footer>
    </>
  );
};

export default Page;
