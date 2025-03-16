import Link from "next/link";
import { dinero, add, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import { Button } from "@/components/mui";
import Paragraph from "@/components/Paragraph";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { formatPrice } from "@/lib/utils/formatters";
import { useTheme } from "@mui/material/styles";

const BasketTotal = ({}) => {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce((total, item) => {
    console.log(total, item);
    return add(total, dinero({ amount: item.price, currency: GBP }));
  }, dinero({ amount: 0, currency: GBP }));
  
  const theme = useTheme();
  const buttonColor = theme.palette.secondary.main;
  const backGroundColor = theme.palette.primary.main;
  const textShadow = theme.textShadow.filter;

  return (
    <>
      {basket.items.length ? (
        <>
          <Button
            component={Link}
            href="/checkout"
            variant="contained"
            color="secondary"
            sx={{ color: `${buttonColor}`, backgroundColor: `${backGroundColor}`, marginBottom: "1em" }}
          >
            Checkout
          </Button>
          <Paragraph sx={{ color: "white", filter: `${textShadow}`, fontSize: "1.5rem" }}>
            Total: {formatPrice(toDecimal(basketTotal))}
          </Paragraph>
        </>
      ) : null}
    </>
  );
};

export default BasketTotal;
