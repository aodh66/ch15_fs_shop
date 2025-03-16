// import {Image} from 'react-native';
// import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { dinero, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import {
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  EditIcon,
  DeleteIcon,
  Button,
  Box,
} from "@/components/mui";
import Heading from "@/components/Heading";
import { slugify, formatPrice } from "@/lib/utils/formatters";

const ProductDisplay = ({
  product: { _id, title, image, price, quantity, description } = {},
  deleteHandler = () => {
    console.log("no delete handler supplied");
  },
  addToBasket = (id) => {
    console.log("no addToBasket handler supplied", id);
  },
  // headingLevel = 3,
  canUpdate = false,
  canRemove = false,
  canBuy = false,
}) => {
  const theme = useTheme();
  const lightTextColor = theme.palette.common.white;
  const backGroundColor = theme.palette.primary.main;
  const buttonColor = theme.palette.secondary.main;
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: `${backGroundColor}`,
        // backdropFilter: "blur(10px)",
        display: "grid",
        // flexDirection: "column",
        gridTemplateRows: "1fr auto minmax(1em, 2em)",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(10px)",
          position: "absolute",
          minWidth: "100%",
          minHeight: "100%",
          zIndex: 0,
        }}
      />
      <CardMedia
        sx={{
          display: "grid",
          placeItems: "center",
          alignSelf: "start",
          zIndex: 1,
        }}
      >
        <Image
          alt={title}
          src={image}
          sx={{ width: "100%" }}
          width="500"
          height="500"
          // fill="true"
          // sizes="(max-width: 768px) 100vw, 33vw"
          // priority="true"
          layout="responsive"

          // style= {{width :"100%"}}
          // source={image}
          // alt={title}
        />
      </CardMedia>
      <CardContent sx={{ 
        // paddingBottom: "0px", 
        alignSelf: "start", zIndex: 1 }}>
        <Heading
          component={`h${3}`}
          sx={{ textAlign: "center", color: `${lightTextColor}` }}
        >
          {title}
        </Heading>
        <List
          component="dl"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1em",
          }}
        >
          <Typography
            component="dt"
            sx={{ textAlign: "right", color: "white" }}
          >
            Price
          </Typography>
          <Typography
            component="dd"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            {formatPrice(toDecimal(dinero({ amount: price, currency: GBP })))}
          </Typography>
          <Typography
            component="dt"
            sx={{ textAlign: "right", color: "white" }}
          >
            Quantity
          </Typography>
          <Typography
            component="dd"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            {quantity} remaining
          </Typography>
          <Typography
            component="dd"
            sx={{
              // fontWeight: "bold",
              color: "white",
              // columnSpan: "auto",
              gridColumn: "1 / span 2",
            }}
          >
            {description}
          </Typography>
        </List>
      </CardContent>
      <CardActions
        sx={{ justifySelf: "center", paddingBottom: "1em", zIndex: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            // gridTemplateColumns: "repeat(2, 1fr)",
            placeItems: "center",
            gap: "1em",
          }}
        >
          <Button
            href={`/products/${slugify(title, _id)}`}
            component={Link}
            sx={{ color: `${buttonColor}` }}
          >
            View
          </Button>
          {canUpdate && (
            <IconButton
              aria-label="update"
              component={Link}
              href={`/admin/products/update/${_id}`}
            >
              <EditIcon />
            </IconButton>
          )}
          {canRemove && (
            <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {canBuy && (
            <Button onClick={addToBasket} color="secondary">
              Add to Basket
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductDisplay;
