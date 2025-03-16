import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useProducts } from "@/lib/tq/products/queries";
import { useAddToBasket } from "@/lib/tq/baskets/mutations";
import { List, ListItem } from "@/components/mui";
import Product from "@/components/Product";
import Paragraph from "@/components/Paragraph";

const useColumns = () => {
  const [width, setWidth] = useState(0)
  const handleResize = () => setWidth(window.innerWidth)
  useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (width < 600) return 1
  else if (width >= 600) return 2
  else if (width > 1023) return 3  
}

const ProductList = (
  {
    deleteHandler = () => {},
    headingLevel = 2,
    canUpdate = false,
    canRemove = false,
    canBuy = true,
  }
) => {
  const columns = useColumns();
  console.log("columns", useColumns());

  const { user } = useUser();
  const mutation = useAddToBasket();

  const { data: products } = useProducts();
  if (!products.length) return <Paragraph>No products to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridColumn:  `${columns}`,
        // justifyItems: "start",
        // {xs: 'span 1', sm: 'span 2', md: 'span 3'},
        // maxWidth: "90vw",
      }}
    >
      {products.map((product) => (
        <ListItem key={product._id} component="li"
        //  sx={{ justifySelf: "start" }}
         >
          <Product
            product={product}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
            canUpdate={canUpdate}
            canRemove={canRemove}
            canBuy={!!user && canBuy}
            addToBasket={() => mutation.mutate(product._id)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;