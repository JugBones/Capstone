import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import colearnLogoWhite from '../assets/colearn-white.png'; 

const Header = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: '#0057FF' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <img src={colearnLogoWhite} alt="CoLearn Logo" style={{ height: '40px' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
