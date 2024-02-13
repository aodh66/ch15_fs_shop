import Head from 'next/head'
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import QueryBoundaries from "@/components/QueryBoundaries";
import ProductList from "@/components/ProductList";
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { fetchProducts } from "@/lib/api-functions/server/products/queries";
import { STORAGE_KEY } from "@/lib/tq/products/settings";
import backgroundImg from "@/images/mountain_med.jpg";

export default function Home() {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImg.src})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      width: "100vw",
      minHeight: "100vh"}}>
      <Head>
        <title>Eclectic Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component='h2' sx={{ color: "white" }} >Products</Heading>
        <QueryBoundaries>
          <ProductList />
        </QueryBoundaries>
        {/* <Paragraph>There should be products above here, or you borked the DB connection.</Paragraph> */}
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
  const products = await fetchProducts().catch((err) => console.log(err));
  const queryClient = new QueryClient();

  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}