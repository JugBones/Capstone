import React, { useState, useEffect } from 'react';
import '../styling/Subjects.css';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import axios from 'axios'; 
import { auth } from '../firebase';  // Import Firebase auth

const Tasks = () => {
  const [tasks, setTasks] = useState([]); 
  const [open, setOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); 

  const fetchTasks = async () => {
    try {
      const user = auth.currentUser;  // Get the current user
      if (user) {
        const response = await axios.get('http://127.0.0.1:8000/tasks', {
          params: { firebase_uid: user.uid }
        });
        setTasks(response.data); 
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Set an interval to refresh tasks periodically
    const intervalId = setInterval(() => {
      fetchTasks();
    }, 5 * 60 * 1000);  // Refresh every 5 minutes

    return () => clearInterval(intervalId);  // Clean up on component unmount
  }, []);

  // Function to open the modal and show the selected task details
  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <List>
        <h3> Tugas </h3>
        {tasks.length > 0 ? tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task.name} secondary={task.date} />
            <Button variant="outlined" color="primary" onClick={() => handleOpen(task)}>
              Detail
            </Button>
          </ListItem>
        )) : <Typography>No upcoming tasks</Typography>}
      </List>

      {/* Modal to show task details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detail Tugas</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <div>
              <Typography variant="h6">{selectedTask.name}</Typography>
              <Typography variant="body1">{selectedTask.description}</Typography>
              <Typography variant="body2">Deadline: {selectedTask.date}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tasks;
