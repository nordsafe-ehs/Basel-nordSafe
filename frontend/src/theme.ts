import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3a7659",
    },
    secondary: {
      main: "#093b56",
    },
    success: {
      main: "#3a7659",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
    },
  },
  spacing: 10,
  shape: {
    borderRadius: 10,
  },
});

export default theme;
