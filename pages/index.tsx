import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const handle = process.env.PRODUCT_HANDLES?.split(",")[0];
  if (handle)
    return {
      redirect: {
        statusCode: 301,
        destination: `/products/${handle}`,
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
