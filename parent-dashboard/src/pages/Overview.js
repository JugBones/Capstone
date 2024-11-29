import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase hook
import { auth } from '../firebase'; // Import your Firebase auth instance
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProgressChart from '../components/ProgressChart';
import Recommendation from '../components/Recommendation';
import Appreciation from '../components/Appreciation';
import Achievement from '../components/Achievement';
import Participation from '../components/Participation';
import { Grid, Box, Typography, Avatar, Tabs, Tab } from '@mui/material';
import '../styling/Overview.css';

const Overview = () => {
  const [user] = useAuthState(auth); // Get current logged-in user

  // Extract username from email or use displayName
  const userName = user?.email ? user.email.split('@')[0] : user?.displayName || 'User';
  const classDescription = 'Kelas 6 - Semester I'; // Example class description

  return (
    <Box className="App">
      <Header />
      <Box className="overview-container">
        {/* Greeting Section */}
        <Box className="greeting-section" display="flex" alignItems="center" mb={3}>
          <Avatar 
            src={user?.photoURL || '/avatar.jpg'} 
            alt="User Avatar" 
            style={{ marginRight: '10px', border: '2px solid #0057FF' }} 
          />
          <Box>
            <Typography variant="h5" style={{ color: 'black' }}>
              Welcome back,
            </Typography>
            <Typography variant="h5" style={{ color: '#1E5BF6', fontWeight: 'bold' }}>
              {userName}
            </Typography>
            <Typography variant="subtitle1" style={{ color: '#0177FB' }}>
              {classDescription}
            </Typography>
          </Box>
        </Box>

        {/* Course Tabs */}
        <Tabs centered value={0} textColor="primary" indicatorColor="primary">
          <Tab label="Matematika" />
          <Tab label="Fisika" />
        </Tabs>

        {/* Main Content */}
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <ProgressChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <Participation />
          </Grid>
          <Grid item xs={12} md={6}>
            <Achievement />
          </Grid>
          <Grid item xs={12} md={6}>
            <Recommendation />
          </Grid>
          <Grid item xs={12}>
            <Appreciation />
          </Grid>
        </Grid>
      </Box>
      <Navbar />
    </Box>
  );
};

export default Overview;
