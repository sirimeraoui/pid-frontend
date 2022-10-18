import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useAuth0 } from "@auth0/auth0-react";

function AppBarC() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
          <img src='ea.png' width={150} height={150} alt='logo' />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            theEafcBookingManager
          </Typography>
          {isAuthenticated ? (
            <Avatar
              src={user.picture}
              alt={user.email}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              {/* <AccountCircleIcon/> */}
            </Avatar >) : (
            <Button color="inherit" onClick={() => loginWithRedirect()}>Connexion</Button>)}

        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default AppBarC;
