import React, { useState, useEffect } from 'react';
import '../styling/Subjects.css';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch subjects and schedules from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/subjects');
        const fetchedSubjects = response.data.map((subject) => {
          const upcomingDate = subject.schedules
            .map(schedule => new Date(schedule.date))
            .filter(date => date > new Date())
            .sort((a, b) => a - b)[0];

          return {
            name: subject.name,
            nextClassDate: upcomingDate ? upcomingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'No upcoming classes',
            allDates: subject.schedules.map(schedule => new Date(schedule.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }))
          };
        });
        setSubjects(fetchedSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  // Handle menu and dialog
  const handleMenuOpen = (event, subject) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubject(subject);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewSchedule = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <h3> Mata Pelajaran Pilihan </h3>
      {subjects.map((subject, index) => (
        <Card key={index} style={{ marginBottom: '10px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5">{subject.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subject.nextClassDate}
            </Typography>
          </CardContent>
          <IconButton
            style={{ position: 'absolute', right: '10px', top: '10px' }}
            onClick={(event) => handleMenuOpen(event, subject)}
          >
            <MoreVertIcon />
          </IconButton>

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

      {/* Popup Dialog for Schedule */}
      {selectedSubject && (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{selectedSubject.name} - Schedule</DialogTitle>
          <DialogContent>
            <List>
              {selectedSubject.allDates.map((date, index) => (
                <ListItem key={index}>
                  <ListItemText primary={date} />
                </ListItem>
              ))}
            </List>
            <Button onClick={handleCloseDialog} color="primary" variant="contained" style={{ marginTop: '10px' }}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Subjects;
