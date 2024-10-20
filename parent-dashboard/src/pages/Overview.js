import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProgressChart from '../components/ProgressChart';
import PollingChart from '../components/PollingChart';
import PollingAccuracy from '../components/PollingAccuracy';
import Tasks from '../components/Tasks';
import Appreciation from '../components/Appreciation';
import Subjects from '../components/Subjects';
import { Grid, Box } from '@mui/material'; 
import '../styling/Overview.css'; 

const Overview = () => {
  // State to manage sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle between true and false
  };

  return (
    <Box className="App">
      <Header toggleSidebar={toggleSidebar} /> {/* Pass toggle function */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass state to sidebar */}

      <Box className="overview-container">
        <Grid container spacing={3}>
          {/* Progress Chart on the left */}
          <Grid item xs={12} md={8}>
            <ProgressChart />
          </Grid>

          {/* Polling Accuracy and Polling Chart on the right */}
          <Grid item xs={12} md={4}>
            <PollingAccuracy />
            <PollingChart />
          </Grid>

          {/* Subjects and Tasks at the bottom */}
          <Grid item xs={12} md={6}>
            <Subjects />
          </Grid>
          <Grid item xs={12} md={6}>
            <Tasks />
          </Grid>

          {/* Appreciation Messages */}
          <Grid item xs={12}>
            <Appreciation />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Overview;
