import { createTheme } from '@mui/material/styles';
import { lightGreen, purple } from '@mui/material/colors';

const primaryColor = lightGreen[500];
const secondaryColor = purple[500];

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
    },

    typography: {
        body1: {

        },
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                colorDefault: primaryColor,
            }
        }
    }
});


export default theme;