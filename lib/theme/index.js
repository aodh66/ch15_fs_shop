import { createTheme } from "@mui/material/styles";
// import { orange, grey, indigo, deepPurple } from "@mui/material/colors";
let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "hsla(90, 0%, 0%, 0.5)",
    },
    secondary: {
      main: "#ffc400",
    },
  },
  typography: {
    h2: {
      fontSize: "2.5rem",
      filter: "drop-shadow(0.1rem 0.1rem 0.2rem black)",
      padding: "0px 16px",
      //     '@media (min-width:600px)': {
      //   fontSize: '2.5rem',
      // },
    },
    h3: {
      fontSize: "1.5rem",
      filter: "drop-shadow(0.1rem 0.1rem 0.2rem black)",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "1rem",
      filter: "drop-shadow(0.1rem 0.1rem 0.2rem black)",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
    },
  },
  backdropFilter: {
    filter: "blur(10px)",
  },
  textShadow: {
    filter: "drop-shadow(0.1rem 0.1rem 0.2rem black)",
  },
  MuiDrawer: {
    paper: {
      backgroundColor: "hsla(90, 0%, 0%, 0.5)",
    },
  },
});

export default theme;
