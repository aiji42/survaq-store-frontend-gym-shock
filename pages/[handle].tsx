import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getProductByHandle, Product } from "@/libs/shopify";
import { NextSeo } from "next-seo";
import Script from "next/script";

declare global {
  interface Window {
    customScriptSurvaq: (id: number) => void;
  }
}

const productSets: { handle: string; productId: number }[] = JSON.parse(
  process.env.PRODUCT_HANDLES ?? "[]"
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:
      productSets.map(({ handle }) => ({
        params: { handle },
      })) ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { product: Product; handle: string; productId: number },
  { handle: string }
> = async ({ params }) => {
  const handle = params?.handle;
  if (!handle) throw new Error();

  const product = await getProductByHandle(handle);

  return {
    props: {
      product,
      handle,
      productId: productSets.find(({ handle: h }) => h === handle)!.productId,
    },
    revalidate: 3600,
  };
};

export const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
  handle,
  productId,
}) => {
  const title = product.seo.title || product.title;
  const shortTitle = title.split("|")[0].trim();
  const description = product.seo.description || product.description;
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          site_name: shortTitle,
          url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${handle}`,
          type: "article",
          title,
          description,
          locale: "ja_JP",
          images: product.images.edges.slice(0, 1).map(({ node }) => node),
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <Script
        src="https://survaq-shopify-partial.vercel.app/bundle.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.customScriptSurvaq(productId);
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
    </>
  );
};

export default Page;
