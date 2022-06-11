import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink, Outlet } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import useAuth from './../hooks/useAuth';
import { Logout } from '@mui/icons-material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor : '#212529',
  color :'#4eac6d',
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      backgroundColor : '#212529',
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
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const {user,name,handleLogout} = useAuth();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Alap - Online Chat App
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent"  open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
            <List sx={{mt : 10}} component='nav'>
                { user.email ? 
                <NavLink style={{color :'#4eac6d',textDecoration : 'none'}} to='/join'>
                    <ListItemButton sx={{ mt:5}}>
                        <ListItemIcon sx={{color :'#4eac6d',}}>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        {user.email}<br/>
                    </ListItemButton>
                </NavLink> : ""
                }
                <NavLink style={{color :'#4eac6d',textDecoration : 'none'}} to='/join'>
                    <ListItemButton sx={{ mt:5}}>
                        <ListItemIcon sx={{color :'#4eac6d',}}>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Join a room" />
                    </ListItemButton>
                </NavLink>
                <NavLink style={{color :'#4eac6d',textDecoration : 'none'}} to='/messages'>
                    <ListItemButton sx={{ mt:5}}>
                        <ListItemIcon sx={{color :'#4eac6d',}}>
                            <MessageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chats" />
                    </ListItemButton>
                </NavLink>
                <NavLink style={{color :'#4eac6d',textDecoration : 'none'}} to='/join'>
                    <ListItemButton sx={{ mt:5}}>
                        <ListItemIcon sx={{color :'#4eac6d',}}>
                            <NightsStayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Light Mood" />
                    </ListItemButton>
                </NavLink>
                <NavLink style={{color :'#4eac6d',textDecoration : 'none'}} to='/join'>
                    <ListItemButton sx={{ mt:5}}>
                        <ListItemIcon sx={{color :'#4eac6d',}}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </NavLink>
                { user.email ? 
                  (
                    <ListItemButton onClick={handleLogout} sx={{ mt:5}}>
                        <ListItemIcon sx={{color :'#4eac6d',}}>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>   
                  ) : ""
                }
            </List>
        </Drawer>
        <Box
          component="main"
          sx={{
           
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}