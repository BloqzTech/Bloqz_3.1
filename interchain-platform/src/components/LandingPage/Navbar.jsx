import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Button from '../Button';

const Navbar = ({ onOpenAuthModal }) => {
  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <h1 className="logo-text" style={{ margin: 0 }}>Bloqz</h1>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => onOpenAuthModal('login')}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => onOpenAuthModal('register')}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
