import React, { useState } from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // State to control the menu open/close

  // Handle Avatar button click to open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleMenuClose(); // Close the menu after logging out
  };

  return (
    <AppBar position="fixed" color="transparent">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Hamburger Menu for Sidebar toggle */}
        <IconButton onClick={toggleSidebar} edge="start">
          <MenuIcon />
        </IconButton>
        
        {/* Search Bar */}
        <div style={{ flexGrow: 1, marginLeft: '20px', marginRight: '20px' }}>
          <InputBase
            placeholder="Search or type"
            startAdornment={<SearchIcon />}
            style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', width: '100%' }}
          />
        </div>
        
        {/* User Avatar with Logout option */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar src="/avatar.jpg" />
        </IconButton>

        {/* Menu for Avatar with Logout option */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
