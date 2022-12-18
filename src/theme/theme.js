import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2"
      },
      secondary: {
        main: "#fafafa"
      },
      background: {
        default: "#00000061"
      }
    },
  })
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#26a27b"
      },
      secondary: {
        main: "#fafafa"
      }
    }
  });

  export  {darkTheme, lightTheme};