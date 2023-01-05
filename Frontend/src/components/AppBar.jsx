
import * as React from 'react';
import { styled, useTheme} from '@mui/material/styles';

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
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Calculator from './Calculator';
import Renthouse from './Renthouse';
import Create from './Create';
import SavedRents from './SavedRent';
import LoginIcon from '@mui/icons-material/Login';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

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
  const [buttonPopup,setButtonPopup] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex',  backgroundColor:"#242d38"}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}   >
        <Toolbar sx={{ backgroundColor:"#242d38", borderBottom:"#242d38", display:'flex' }}>
          <IconButton
            color="#efd592"
            
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon  sx={{ backgroundColor:"#242d38", color:"#efd592" }}/>
          </IconButton>
         <a href="/"> <img  src="./house.png" alt="" className='house-logo' /></a>
          <div className="mainbar">
          <Typography sx={{ fontFamily:"initial", display:'flex', flexWrap:'wrap'}} className='ren-ten-ten' color="#efd592"  variant="h4" noWrap component="div">
            Rententen House
            
          </Typography>
          <div className="phone">
              <PhoneIcon /> <a href="tel:+36 70 207 4102">+36 70 207 4102</a>
            </div>
            <div className="email">
              <EmailIcon />{" "}
              <a href="mailto:t0csa91@gmail.com">t0csa91@gmail.com</a>
            </div>
          {/* <button  className='log-in' onClick={()=>setButtonPopup(true)}> <FavoriteIcon/></button> 

          <Popup trigger = {buttonPopup} setTrigger={setButtonPopup}>
           
          </Popup> */}
          </div>
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
        onClick={handleDrawerClose}
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
    </Router>
      </Main>
    </Box>
  );
}