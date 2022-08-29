import React, { Fragment } from 'react';
import {
  AppBar,
  Box,
  Button,
  Grid,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DrawerComp from './Drawer';
import theme from './theme';
import media from './theme';
import '../styles/Header.css';

const Header = (props: any): JSX.Element => {
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography>School</Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Box>
                <MenuItem component={Link} to={'/home'}>
                  Home
                </MenuItem>
                <MenuItem component={Link} to={'/courses'}>
                  Popular Course
                </MenuItem>
                <MenuItem component={Link} to={'/feature'}>
                  Main Feature
                </MenuItem>
              </Box>
              <Grid container>
                <Button component={Link} to="/signin" variant="contained">
                  Login
                </Button>
                <Button component={Link} to="/signup" variant="contained">
                  SignUp
                </Button>
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
      {props.children}
    </Fragment>
  );
};

export default Header;
