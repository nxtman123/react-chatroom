import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 720,
            lg: 1280,
            xl: 1920
        }
    },
    typography: {
        useNextVariants: true
    }
});

export default theme;
