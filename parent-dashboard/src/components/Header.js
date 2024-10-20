import React from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <InputBase
            placeholder="Search or type"
            startAdornment={<SearchIcon />}
            style={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}
          />
        </div>
        <IconButton onClick={handleLogout}>
          <Avatar src="/avatar.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
