import type { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      statusCode: 301,
      destination: "/products/bihada",
    },
  };
};

const Home: NextPage = () => {
  return null;
};

export default Home;
