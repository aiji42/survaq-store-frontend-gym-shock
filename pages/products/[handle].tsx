import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Shopify from "@shopify/shopify-api";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { handle: "bihada" } }],
    fallback: false,
  };
};

type Product = {
  id: string;
  handle: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: {
    id: string;
    width: number;
    height: number;
    url: string;
    altText: string | null;
  } | null;
  seo: {
    title: string | null;
    description: string | null;
  };
  description: string;
  descriptionHtml: string;
};

const query = (handle: string) => `
{
  productByHandle(handle: "${handle}") {
    id
    handle
    title
    createdAt
    updatedAt
    featuredImage {
      id
      width
      height
      url
      altText
    }
    seo {
      title
      description
    }
    description
    descriptionHtml
  }
}
`;

export const getStaticProps: GetStaticProps<
  { product: Product },
  { handle: string }
> = async ({ params }) => {
  const handle = params?.handle;
  if (!handle) throw new Error();

  const client = new Shopify.Clients.Graphql(
    `${process.env.SHOPIFY_SHOP_NAME}.myshopify.com`,
    process.env.SHOPIFY_API_SECRET_KEY
  );
  const {
    body: {
      // @ts-ignore
      data: { productByHandle },
    },
  } = await client.query({
    data: query(handle),
  });

  return {
    props: {
      product: productByHandle,
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
