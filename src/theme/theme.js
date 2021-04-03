import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { LensTwoTone } from "@material-ui/icons";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFE81F",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          backgroundColor: `black`,
        },
      },
    },
    MuiSelect: {
      root: {
        color: "rgba(255,255,255, 0.8)",
      },
    },

    MuiFormLabel: {
      root: {
        color: "rgba(255,255,255, 0.8)",
        "&.MuiFormLabel-root.Mui-focused": {
          display: "none",
        },
      },
    },
    MuiInputLabel: {
      root: {
        display: "none",
      },
    },
    MuiInput: {
      root: {
        color: "white",
        borderBottom: "red",
        "&::placeholder": {
          color: "red",
        },
      },

      input: {
        "&::placeholder": {
          color: "white",
        },
      },
    },

    MuiInputBase: {
      root: {
        // color: "white",
        "&.MuiInput-underline:before": {
          borderBottom: "2px solid rgba(255,255,255, 0.8)",
        },
        "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid white",
        },
      },
    },

    MuiCard: {
      root: {
        backgroundColor: "black",
        border: "2px solid rgba(255,255,255, 0.8)",
        color: "rgba(255,255,255, 0.8)",
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
