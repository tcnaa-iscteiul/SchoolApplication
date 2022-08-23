import { createTheme } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },
    },

    typography: {
        body1: {

        },
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1rem',

                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                // Name of the slot
                root: {
                    MuiBox: {
                        display: 'inline-list-item',
                    },
                    button: {
                        color: 'red',
                        textDecoration: 'none',
                        display: 'inline-list-item',
                    },

                },
            },
        },
    },
});


export default theme;