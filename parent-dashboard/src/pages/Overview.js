import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProgressChart from '../components/ProgressChart';
import PollingChart from '../components/PollingChart';
import PollingAccuracy from '../components/PollingAccuracy';
import Tasks from '../components/Tasks';
import Appreciation from '../components/Appreciation';
import Subjects from '../components/Subjects';
import { Grid2 } from '@mui/material'; 
import '../styling/Overview.css'; 

const Overview = () => {
  return (

    <div className="App">
      <Header />
      <Sidebar />
    <div className="overview-container">
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} sm={6} md={6}>
          <ProgressChart />
        </Grid2>
        <Grid2 item xs={12} sm={3} md={3}>
          <PollingChart />
        </Grid2>
        <Grid2 item xs={12} sm={3} md={3}>
          <PollingAccuracy />
        </Grid2>
        <Grid2 item xs={12} sm={6} md={6}>
          <Subjects />
        </Grid2>
        <Grid2 item xs={12} sm={3} md={3}>
          <Tasks />
        </Grid2>
        <Grid2 item xs={12}>
          <Appreciation />
        </Grid2>
      </Grid2>
    </div>
  </div>
  );
};

export default Overview;
