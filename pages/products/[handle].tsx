import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
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
      <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
    </>
  );
};

export default Page;
