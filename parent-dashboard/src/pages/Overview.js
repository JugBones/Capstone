import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios'; // To fetch data from the backend
import { auth } from '../firebase';
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
  const [user] = useAuthState(auth);
  const userName = user?.email ? user.email.split('@')[0] : user?.displayName || 'User';
  const [selectedCourse, setSelectedCourse] = useState('Matematika');
  const [classData, setClassData] = useState(null); 
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8000/users/${user.uid}`);
          const classResponse = await axios.get(`http://localhost:8000/classes/${response.data.class_id}`);
          setClassData(classResponse.data); // Set class data
        } catch (err) {
          console.error("Error fetching class data:", err);
          setClassData({ name: 'Class not found', level: '' }); // Fallback value
        }
      }
    };
    fetchClassData();
  }, [user]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:8000/courses');
          setCourses(response.data);
        } catch (err) {
          console.error('Error fetching courses:', err);
        }
      }
    };
    fetchCourses();
  }, [user]);
  
  return (
    <Box className="App">
      <Header />
      <Box className="overview-container">
        <Box className="greeting-section" display="flex" alignItems="center" mb={3}>
          <Avatar src={user?.photoURL || '/avatar.jpg'} alt="User Avatar" />
          <Box>
            <Typography variant="h5" color="black">Welcome back,</Typography>
            <Typography variant="h5" color="#1E5BF6" fontWeight="bold">{userName}</Typography>
            <Typography variant="subtitle1" color="#0177FB">{classData ? `${classData.name} - ${classData.level}` : 'Loading class...'}</Typography>
          </Box>
        </Box>

        {/* Course Tabs */}
        <Tabs
          centered
          value={selectedCourse}
          onChange={(e, newValue) => setSelectedCourse(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          {courses.map((course) => (
            <Tab key={course.id} label={course.name} value={course.name} />
          ))}
        </Tabs>

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <ProgressChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <Participation user={user} selectedCourse={selectedCourse} />
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
