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
import theme from './Theme';
import '../styles/Header.css';
import { IChildren } from '../../interfaces/IChildren';

const Header = (props: IChildren): JSX.Element => {
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToElement = async (event: React.MouseEvent) => {
    event.preventDefault();
    const element = event.currentTarget?.textContent || '';
    document.getElementById(element)?.scrollIntoView({ behavior: 'smooth' });
  };

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
                <MenuItem onClick={scrollToElement}>Main Feature</MenuItem>
                <MenuItem onClick={scrollToElement}>Popular Course</MenuItem>
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
