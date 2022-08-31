import { NextSeo } from "next-seo";
import { Product } from "@/libs/getProduct";

export const ProductPageSeo = ({
  handle,
  product,
}: {
  handle: string;
  product: Product;
}) => {
  const title = product.seo.title || product.title;
  const shortTitle = title.split("|")[0].trim();
  const description = product.seo.description || product.description;

  return (
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
  );
};
