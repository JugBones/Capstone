import React from 'react';
import '../styling/Subjects.css'
import { Card, CardContent, Typography } from '@mui/material';

const subjects = [
  { name: 'Fisika', date: 'December 14, 08:30 PM' },
  { name: 'Matematika', date: 'December 18, 10:30 PM' },
];

const Subjects = () => {
  return (
    <div>
      <h3> Mata Pelajaran Pilihan </h3>
      {subjects.map((subject, index) => (
        <Card key={index} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h5">{subject.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subject.date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Subjects;
