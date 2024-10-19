import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';

const appreciations = [
  { name: 'Anna Karlos', message: 'Adi kelas kmrn aktif bgt' },
  { name: 'Karla May', message: 'Adi fokus ketika belajar' },
];

const Appreciation = () => {
  return (
    <Grid container spacing={2}>
      {appreciations.map((item, index) => (
        <Grid item key={index} xs={6}>
          <Avatar alt={item.name} src={`/tutors/tutor-${index}.jpg`} />
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body2">{item.message}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Appreciation;
