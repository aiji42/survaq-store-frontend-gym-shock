import { GetStaticPaths, GetStaticProps } from "next";
import { getProduct, Product } from "@/libs/getProduct";
import { AddToCart } from "@/components/AddToCart";
import { ComponentProps } from "react";
import { ProductPageSeo } from "@/components/ProductPageSeo";
import { useReplaceSchedule } from "@/libs/hooks/useReplaceSchedule";

const productSets: { handle: string; productId: number }[] = JSON.parse(
  process.env.PRODUCT_HANDLES ?? "[]"
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:
      productSets.map(({ handle }) => ({
        params: { handle },
      })) ?? [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  Props,
  { handle: string }
> = async ({ params }) => {
  const handle = params?.handle;
  if (!handle) throw new Error();
  if (!productSets.map(({ handle }) => handle).includes(handle))
    return {
      redirect: {
        statusCode: 301,
        destination: `/${productSets[0].handle}`,
      },
      revalidate: 3600,
    };

  const productId = productSets.find(
    ({ handle: h }) => h === handle
  )!.productId;
  const product = await getProduct(handle, productId);

  return {
    props: {
      product,
      handle,
      productId,
    },
    revalidate: 3600,
  };
};

type Props = ComponentProps<typeof AddToCart> &
  ComponentProps<typeof ProductPageSeo> & { product: Product };

export const Page = (props: Props) => {
  useReplaceSchedule(props.product);

  return (
    <>
      <ProductPageSeo {...props} />
      <div
        dangerouslySetInnerHTML={{ __html: props.product.descriptionHtml }}
      />
      <AddToCart {...props} />
    </>
  );
};

export default Page;
