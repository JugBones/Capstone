import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProgressChart from '../components/ProgressChart';
import Recommendation from '../components/Recommendation';
import Appreciation from '../components/Appreciation';
import Achievement from '../components/Achievement';
import Participation from '../components/Participation';
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

          {/* Participation section */}
          <Grid item xs={12} md={4}>
            <Participation />
          </Grid>

          {/* Achievement section */}
          <Grid item xs={12} md={6}>
            <Achievement />
          </Grid>

          {/* Recommendation section */}
          <Grid item xs={12} md={6}>
            <Recommendation />
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
