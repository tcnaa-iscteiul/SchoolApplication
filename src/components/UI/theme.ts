import { createTheme } from "@mui/material/styles";
import { lightGreen, purple } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";

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
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    marginTop: "64px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                },
            },
            variants: [
                {
                    props: { maxWidth: "lg" },
                    style: {
                        mt: 4,
                        mb: 4,
                    },
                },
            ],
        },
        MuiAvatar: {
            styleOverrides: {
                colorDefault: primaryColor,
            },
        },
        MuiIconButton: {
            variants: [
                {
                    props: { edge: "end" },
                    style: {
                        marginLeft: "auto",
                    },
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: "h6" },
                    style: {
                        flexGrow: 1,
                    },
                },
            ],
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: "100%",
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: "100%",
                    marginTop: "5%",
                },
            },
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    minWidth: "400px",
                },
            },
        },
        MuiPaper: {
            variants: [
                {
                    props: { elevation: 1 },
                    style: {
                        padding: "192px",
                    },
                },
                {
                    props: { elevation: 2 },
                    style: {
                        padding: "64px",
                    },
                },
            ],
        },
    },
});

export const maxWidthModal = 200;
export const maxWidthSpinner = 50;
export default theme;
