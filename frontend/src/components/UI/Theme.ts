import { createTheme } from '@mui/material/styles'
import { lightGreen, purple } from '@mui/material/colors'

const primaryColor = lightGreen[500]
const secondaryColor = purple[500]

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          marginTop: '64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          MuiButton: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  width: '100%',
                  color: secondaryColor,
                  alignItems:'right',
                },
              },
            ],
          },
        },
      },
      variants: [
        {
          props: { maxWidth: 'lg' },
          style: {
            mt: 4,
            mb: 4,
          },
        },
      ],
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
          borderRadius: '50px',
          height: 'auto',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: primaryColor,
      },
      variants: [
        {
          props: { variant: 'rounded' },
          style: {
            backgroundColor: secondaryColor,
            height: 56,
            width: 56,
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: { edge: 'end' },
          style: {
            marginLeft: 'auto',
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          marginTop: '5%',
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          minWidth: '400px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          root: {
            width: '100%',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
      variants: [
        {
          props: { container: true },
          style: {
            marginTop: 10,
            marginBottom: 9,
          },
        },
        {
          props: { container: true, item: true },
          style: {
            marginTop: 36,
            marginBottom: 36,
            display: 'inline-flex',
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { elevation: 3 },
          style: {
            padding: '192px',
          },
        },
        {
          props: { elevation: 2 },
          style: {
            padding: '64px',
          },
        },
      ],
    },
    MuiListItemButton:{
      styleOverrides: {
        root: {
          backgroundColor:primaryColor,
          '&.MuiListItemButton-root:hover': {
            '&, &.MuiListItemIcon-root': {
              color: primaryColor,
            },
          },
          "&.Mui-selected": {
            backgroundColor: 'white',
            color: 'black'
          }
        },
        selected: {
          },
        }
      }
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
    },
  },
})

export const maxWidthModal = 200
export const maxWidthSpinner = 50
export default theme
