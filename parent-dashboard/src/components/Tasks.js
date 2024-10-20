import React from 'react';
import '../styling/Subjects.css'
import { List, ListItem, ListItemText, Button } from '@mui/material';

const tasks = [
  { name: 'Aljabar', date: 'Senin, Nov 11' },
  { name: 'Gerak Parabola', date: 'Rabu, Nov 15' },
];

const Tasks = () => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemText primary={task.name} secondary={task.date} />
          <Button variant="outlined" color="primary">Detail</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Tasks;
