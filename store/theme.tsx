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
            fontWeight: "bold"
        }
    }
});

export default theme;
