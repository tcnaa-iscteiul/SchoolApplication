import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActions } from '../../store/menu-slice';
import { useSignUp }  from "../../hooks/useSignUp";

interface AppBarProps extends MuiAppBarProps {
    open ?: boolean;
}


const drawerWidth: number = 300;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const DashboardToolbar = (props: any) => {

    const { logout } = useSignUp();
    const dispatch = useDispatch();

    const logoutHandler = async (event: any) => {
        event.preventDefault();
        logout();
    }

    const clickDashboardHandler = () => {
        dispatch(menuActions.addOption({ option: '' }));
    }


    return (
        <AppBar position="absolute" open={props.open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => { props.handleGetOpen(!props.open) }}
                    sx={{
                        marginRight: '36px',
                        ...(props.open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    onClick={clickDashboardHandler}
                >
                    Dashboard

                </Typography>

                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </Toolbar>
        </AppBar>);
}

export default DashboardToolbar;

function deleteToken(arg0: string | undefined) {
    throw new Error('Function not implemented.');
}
