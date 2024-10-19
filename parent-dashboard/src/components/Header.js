import React from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
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
        <IconButton>
          <Avatar src="/avatar.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
