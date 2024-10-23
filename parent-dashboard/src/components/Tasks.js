import React, { useState, useEffect } from 'react';
import '../styling/Subjects.css';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import axios from 'axios'; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]); 
  const [open, setOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); 

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks'); // Update this with your backend URL
        setTasks(response.data); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
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
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task.name} secondary={task.date} />
            <Button variant="outlined" color="primary" onClick={() => handleOpen(task)}>
              Detail
            </Button>
          </ListItem>
        ))}
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
