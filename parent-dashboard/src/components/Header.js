import React, { useState } from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Avatar, Menu, MenuItem, Modal, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import colearnLogoWhite from '../assets/colearn-white.png'; // Import the white version of the CoLearn logo

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Firebase hook to get current user
  const [anchorEl, setAnchorEl] = useState(null); // State to control the menu open/close
  const [searchOpen, setSearchOpen] = useState(false); // State to control search modal visibility

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

  // Handle search icon click to open modal
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  // Close search modal
  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#0057FF' }}> {/* Apply CoLearn Blue color */}
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: Hamburger + Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleSidebar} edge="start">
            <MenuIcon style={{ color: 'white' }} /> {/* Set menu icon color to white */}
          </IconButton>
          <img src={colearnLogoWhite} alt="CoLearn Logo" style={{ height: '40px', marginLeft: '10px' }} /> {/* Logo beside Hamburger */}
        </div>

        {/* Center: Greeting */}
        {user && (
          <Typography variant="h6" style={{ color: 'white' }}>
            Hello, {user.email ? user.email.split('@')[0] : user.displayName}
          </Typography>
        )}

        {/* Right: Search + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Search Icon */}
          <IconButton onClick={handleSearchOpen} style={{ marginRight: '15px' }}>
            <SearchIcon style={{ color: 'white' }} />
          </IconButton>

          {/* User Avatar with Logout option */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar src="/avatar.jpg" style={{ border: '2px solid white' }} /> {/* Set avatar border to white */}
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

          {/* Modal for search input */}
          <Modal open={searchOpen} onClose={handleSearchClose}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '400px',
            }}>
              <InputBase
                placeholder="Search or type"
                startAdornment={<SearchIcon style={{ color: '#0057FF' }} />}
                style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', width: '100%' }}
              />
            </Box>
          </Modal>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
