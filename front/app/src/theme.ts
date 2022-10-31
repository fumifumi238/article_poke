import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // TODO:テーマ設定を行います
  components: {
    //`MuiCssBaseline`になっているが`CssBaseLine`ても同様に作用した
    MuiCssBaseline: {
      styleOverrides: `
            ::-webkit-scrollbar{
                display: none
            },
            ::-webkit-scrollbar-thumb {
                background-color: #ffffff;
            }
            `,
    },
  },
  
});

export default theme;
