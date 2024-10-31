import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book'; // Icon for Syllabus
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import '../styling/Sidebar.css';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <IconButton onClick={toggleSidebar}>
          <CloseIcon style={{ color: '#ffffff' }} />
        </IconButton>
      </div>
      <List>
        <ListItem button component={Link} to="/overview" className="sidebar-item">
          <ListItemIcon>
            <HomeIcon className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Overview" className="sidebar-text" />
        </ListItem>

        <ListItem button component={Link} to="/settings" className="sidebar-item">
          <ListItemIcon>
            <SettingsIcon className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Settings" className="sidebar-text" />
        </ListItem>

        <ListItem button component={Link} to="/syllabus" className="sidebar-item">
          <ListItemIcon>
            <BookIcon className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Syllabus" className="sidebar-text" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
