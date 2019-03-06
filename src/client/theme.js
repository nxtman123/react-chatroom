import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: deepPurple[600]
        },
    },
    typography: {
        useNextVariants: true
    }
});

export default theme;
