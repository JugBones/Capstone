import React, { useState } from 'react';
import '../styling/Subjects.css';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import the three-dots icon

const subjects = [
  { name: 'Fisika', date: 'December 14, 08:30 PM' },
  { name: 'Matematika', date: 'December 18, 10:30 PM' },
];

const Subjects = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Function to handle menu open
  const handleMenuOpen = (event, subject) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubject(subject);
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSubject(null);
  };

  // Function to handle "Lihat Jadwal" click
  const handleViewSchedule = () => {
    alert(`Lihat jadwal for ${selectedSubject.name}`);
    handleMenuClose();
  };

  return (
    <div>
      <h3> Mata Pelajaran Pilihan </h3>
      {subjects.map((subject, index) => (
        <Card key={index} style={{ marginBottom: '10px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5">{subject.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subject.date}
            </Typography>
          </CardContent>
          {/* Three dots button */}
          <IconButton
            style={{ position: 'absolute', right: '10px', top: '10px' }}
            onClick={(event) => handleMenuOpen(event, subject)}
          >
            <MoreVertIcon />
          </IconButton>

          {/* Menu for "Lihat Jadwal" */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleViewSchedule}>Lihat Jadwal</MenuItem>
          </Menu>
        </Card>
      ))}
    </div>
  );
};

export default Subjects;
