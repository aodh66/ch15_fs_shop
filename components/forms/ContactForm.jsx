import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const schema = yup
  .object()
  .shape({
    from: yup.string().email().max(50).required(),
    subject: yup.string().max(300).required(),
    message: yup.string().max(50000).required(),
  })
  .required();

const defaults = {
    from: '',
    subject: '',
    message: '',
};

export default function ContactForm({ submitHandler }) {
  const theme = useTheme();
  const lightTextColor = theme.palette.common.white;
  const backGroundColor = theme.palette.primary.main;
  const buttonColor = theme.palette.secondary.main;
  const textShadow = theme.textShadow.filter;

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaults,
  });

  useEffect(() => {
    console.log(formState);
  })

  const formRowStyle = {
    marginBlockEnd: "1em",
        backgroundColor: `${backGroundColor}`,
        borderRadius: "4px",
        // color: `${lightTextColor}`,
          // backdropFilter: "blur(10px)",
  };

  let submitFn = (vals) => {
      reset();
      console.log("🚀 ~ file: ContactForm.jsx:47 ~ submitFn ~ vals:", vals)
      submitHandler(vals);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(submitFn)} style={{ marginTop: "0.5em" }}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="from"
          defaultValue={""}
          render={({ field }) => (
            <TextField
            type="text"
              {...field}
              label="from"
              fullWidth
              error={!!errors.from}
              helperText={errors.from?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="subject"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="subject"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject?.message}
              inputProps={{ style: { color: `${lightTextColor}` } }}
              InputLabelProps={{ style: { color: `${lightTextColor}`, filter: `${textShadow}` } }}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="message"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="message"
              fullWidth
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message}
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