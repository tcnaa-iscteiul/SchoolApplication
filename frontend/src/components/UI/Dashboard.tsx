import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentContainer from '../Admin/StudentContainer';
import ListItems from '../Admin/ListItems';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton, {
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import theme from './theme';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { menuActions } from '../../store/menu-slice';
import { useSignUp } from '../../hooks/useSignUp';
import { useState } from 'react';
import { Role } from '../../interfaces/Role';
import TeacherContainer from '../Teacher/TeacherContainer';
const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IconButtonProps extends MuiIconButtonProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

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

const IconButtonToolbar = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})<IconButtonProps>(({ open }) => ({
  marginRight: '36px',
  ...(open && { display: 'none' }),
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  left: 0,
  px: [1],
});

const Main = styled(Box)({
  backgroundColor: theme.palette.grey[100],
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
});

type DashboardProps = {
  options: lists[];
};

export default function DashboardContent(props: DashboardProps) {
  const { logout } = useSignUp();
  const dispatch = useAppDispatch();

  const logoutHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    logout();
  };

  const clickDashboardHandler = () => {
    dispatch(menuActions.addOption(''));
  };
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { role } = useAppSelector((state) => state.auth);

  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButtonToolbar
            onClick={() => {
              setOpen(!open);
            }}
          >
            <MenuIcon />
          </IconButtonToolbar>

          <Typography variant="h6" noWrap onClick={clickDashboardHandler}>
            Dashboard
          </Typography>

          <Button variant="contained" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <StyledToolbar>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </StyledToolbar>
        <Divider />
        <List component="nav">
          <ListItems key={Math.random()} list={props.options} />
        </List>
      </Drawer>
      <Main>
        <Toolbar />
        {role === Role.Admin && <StudentContainer />}
        {role === Role.Teacher && <TeacherContainer />}
      </Main>
    </Box>
  );
}
