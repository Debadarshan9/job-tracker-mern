import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
        body: {
          color: "rgba(0, 0, 0, 0.78)",
        },
      },
    },
  },
});
