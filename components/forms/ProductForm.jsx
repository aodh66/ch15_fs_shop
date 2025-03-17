import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { addProductSchema, updateProductSchema } from "@/lib/validation";


const defaults = {
  image: "",
  title: "",
  description: "",
  price: "",
  quantity: "",
};

export default function ProductForm({ submitHandler, product }) {
  const theme = useTheme();
  const lightTextColor = theme.palette.common.white;
  const backGroundColor = theme.palette.primary.main;
  const buttonColor = theme.palette.secondary.main;
  const textShadow = theme.textShadow.filter;
let schema = addProductSchema;
if(product) {
  schema = updateProductSchema;
}
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: product || defaults,
  });

  useEffect(() => {
    console.log(formState);
  });

  const formRowStyle = {
    marginBlockEnd: "1em",
        backgroundColor: `${backGroundColor}`,
        borderRadius: "4px",
  };

  let submitFn = (vals) => {
    reset();
    console.log("🚀 ~ file: ContactForm.jsx:47 ~ submitFn ~ vals:", vals);
    submitHandler(vals);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(submitFn)} style={{ marginTop: "0.5em" }}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="image"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="image"
              fullWidth
              error={!!errors.image}
              helperText={errors.image?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="title"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="description"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="description"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="price"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="number"
              {...field}
              label="price"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="quantity"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="number"
              {...field}
              label="quantity"
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mr: 2, color: `${buttonColor}` }}
          disabled={!isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          primary="true"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
          sx={{ color: `${buttonColor}` }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
