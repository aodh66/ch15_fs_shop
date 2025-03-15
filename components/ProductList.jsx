import { useUser } from "@auth0/nextjs-auth0/client";
import { useProducts } from "@/lib/tq/products/queries";
import { useAddToBasket } from "@/lib/tq/baskets/mutations";
import { List, ListItem } from "@/components/mui";
import Product from "@/components/Product";
import Paragraph from "@/components/Paragraph";

const ProductList = (
    {
  deleteHandler = () => {},
  headingLevel = 2,
  canUpdate = false,
  canRemove = false,
  canBuy = true,
}
) => {
  const { user } = useUser();
  const mutation = useAddToBasket();

  const { data: products } = useProducts();
  if (!products.length) return <Paragraph>No products to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(25vw,90vw))",
        // gridColumn:  'span 2'
        // {xs: 'span 1', sm: 'span 2', md: 'span 3'},
        // maxWidth: "90vw",
      }}
    >
      {products.map((product) => (
        <ListItem key={product._id} component="li"
        //  sx={{ width: "95vw", justifySelf: "center" }}
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