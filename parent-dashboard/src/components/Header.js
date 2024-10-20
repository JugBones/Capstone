import React from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
        
        {/* User Avatar with Logout functionality */}
        <IconButton onClick={handleLogout}>
          <Avatar src="/avatar.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
