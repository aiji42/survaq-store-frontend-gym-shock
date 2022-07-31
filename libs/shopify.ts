import Shopify from "@shopify/shopify-api";

export type Product = {
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
  images: { edges: { node: { url: string } }[] };
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
    images(first: 5) {
      edges {
        node {
          url
        }
      }
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

export const getProductByHandle = async (handle: string): Promise<Product> => {
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

  return productByHandle;
};
