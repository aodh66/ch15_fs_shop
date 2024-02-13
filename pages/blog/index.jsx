import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { 
    List,
    ListItem,
    Card,
    CardMedia,
    CardContent,
    CardActions,
 } from '@/components/mui'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading';
import { AllPosts } from '@/lib/hygraph/queries';
import backgroundImg from "@/images/mountain_color.jpg";

export default function Blog({ ssd=[] }) {
    // console.log("ssd", ssd);
  return (
    <div style={{
      backgroundImage: `url(${backgroundImg.src})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      width: "100vw",
      minHeight: "100vh"}}>
      <Head>
        <title>Eclectic Shop Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component='h2' sx={{ color: "white" }} >Blog Articles</Heading>
        <List component={"ol"} sx={{ listStyle: "none" }}>
          {ssd.map(({ id, title, slug, heroImage: { url } }) => (
            <ListItem key={id}>
              <Card component={"article"} sx={{ width: "100%", backgroundColor: "hsla(90, 0%, 0%, 0.5)" }}>
                <CardMedia sx={{ display: "grid", placeContent: "center" }}>
                  <Image alt={title} src={url} width="300" height="200" />
                </CardMedia>
                <CardContent>
                  <Heading component="h2" color="white">{title}</Heading>
                </CardContent>
                <CardActions>
                  <Link href={`/blog/${slug}`}>Read more...</Link>
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>
      </Layout>
    </div>
  )
}

export const getStaticProps = async () => {
    const allPosts = await fetch(process.env.HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": `application/json; charset="UTF-8`,
          Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`, // "Authorization"
        },
        body: JSON.stringify({
          query: AllPosts,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      console.log('allposts', allPosts);
      const posts = allPosts.data.blogPosts;
      console.log('posts', posts);
      return {
        props: {
          ssd: posts,
        },
      };
}