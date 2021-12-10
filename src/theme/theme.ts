import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'PocketMonk';
        src: local('PocketMonk'), url(./fonts/PocketMonk.ttf) format('truetype');
      }
      `,
    },
  },
});