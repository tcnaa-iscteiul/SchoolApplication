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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DrawerComp from "./Drawer";
import theme from './theme';

const Header = (props: any): JSX.Element => {

    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    {isMatch ? (
                        <>
                            <Typography>
                                School
                            </Typography>
                            <DrawerComp />
                        </>
                    ) : (
                        <>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem key={"Home"}>
                                        Home
                                    </MenuItem>
                                </Link>
                                <Link to='/courses' style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem key={"Popular Course"}>
                                        Popular Course
                                    </MenuItem>
                                </Link>
                                <Link to='/feature' style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem key={"Main Feature"} >
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