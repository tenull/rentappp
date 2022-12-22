import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Calculator from './Calculator';
import Renthouse from './Renthouse';
import Create from './Create';
import SavedRents from './SavedRent';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
 
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor:"#242d38"}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}  >
        <Toolbar sx={{ backgroundColor:"#242d38", borderBottom:"#242d38" }}>
          <IconButton
            color="#efd592"
            
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon  sx={{ backgroundColor:"#242d38", color:"#efd592" }}/>
          </IconButton>
          <Typography color="#efd592"  variant="h4" noWrap component="div">
            Ren ten ten House
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:"#242d38"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader  >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ backgroundColor:"#242d38", color:"#efd592" }} /> : <ChevronRightIcon sx={{ backgroundColor:"#242d38", color:"#efd592" }} />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ display:'flex', flexDirection: 'column' }} />
        <Navbar sx={{ display:'flex', flexDirection: 'column' }}/>
        <Divider sx={{ display:'flex', flexDirection: 'column' }} />
        
          
      </Drawer>
      <Main open={open} sx={{ backgroundColor:"#242d38", color:"#efd592", }}>
        <DrawerHeader  />
        <Router  >
      {/* <AppBar/>
      <div className="App">
     <div className="content">
        <Switch>
        <Route exact path="/">
              <Home />
            </Route>
            
        <Route path="/calculator">
            <Calculator/>
          </Route>
          <Route path="/rent">
           <Renthouse /> 
          </Route>
          
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/saved">
            <SavedRents />
          </Route>
        </Switch>
        </div>
      </div> */}

    </Router>
      </Main>
    </Box>
  );
}