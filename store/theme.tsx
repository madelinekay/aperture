import { createTheme } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#282828",
            light: "#fffcff"
        },
    },
    typography: {
        h2: {
            color: "black",
            fontFamily: "Arial, Helvetica, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 3,
            fontSize: 16,
        }
    }
});

export default theme;
