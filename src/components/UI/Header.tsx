import React from "react";
import {
    AppBar,
    Box,
    Button,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import { Link } from 'react-router-dom';
import DrawerComp from "./Drawer";
import { createTheme } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },
    },
});

const Header = (props: any): JSX.Element => {

    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    {isMatch ? (
                        <>
                            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                                School
                            </Typography>
                            <DrawerComp />
                        </>
                    ) : (

                        <>
                            <Box sx={{
                                display: 'flex',

                                alignItems: 'center',
                            }}>
                                <Link to='/home' style={{ textDecoration: 'none', color: 'black' }} >
                                    <MenuItem key={"Home"} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                        Home
                                    </MenuItem>
                                </Link>
                                <Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem key={"Popular Course"} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                        Popular Course
                                    </MenuItem>
                                </Link>
                                <Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem key={"Main Feature"} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                        Main Feature
                                    </MenuItem>
                                </Link>
                            </Box>
                            <Link to="/signin" style={{ textDecoration: 'none', marginLeft: "auto" }}>
                                <Button variant="contained" >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup" style={{ textDecoration: 'none', marginLeft: "10px" }}>
                                <Button variant="contained">
                                    SignUp
                                </Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            {props.children}
        </React.Fragment>
    );
};

export default Header;