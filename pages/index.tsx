import type { GetServerSideProps, NextPage } from "next";

const productSets: { handle: string; productId: number }[] = JSON.parse(
  process.env.PRODUCT_HANDLES ?? "[]"
);

export const getServerSideProps: GetServerSideProps = async () => {
  const handle = productSets[0].handle;
  if (handle)
    return {
      redirect: {
        statusCode: 301,
        destination: `/${handle}`,
      },
    };

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return null;
};

export default Home;
