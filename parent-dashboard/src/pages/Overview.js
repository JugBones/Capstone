import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { auth } from '../firebase';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProgressChart from '../components/ProgressChart';
import Recommendation from '../components/Recommendation';
import Appreciation from '../components/Appreciation';
import Achievement from '../components/Achievement';
import Participation from '../components/Participation';
import { Grid, Box, Typography, Tabs, Tab } from '@mui/material';
import '../styling/Overview.css';

const Overview = () => {
  const [user] = useAuthState(auth);
  const userName = user?.email ? user.email.split('@')[0] : user?.displayName || 'User';
  const [selectedCourse, setSelectedCourse] = useState('Matematika');
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || "/avatar.jpg");
  const [classData, setClassData] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch updated profile picture from the backend
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${user.uid}/profile_picture`
        );
        setProfilePicture(response.data.profile_picture_url || "/avatar.jpg");
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    if (user) fetchProfilePicture();
  }, [user]);


  useEffect(() => {
    const fetchClassData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8000/users/${user.uid}`);
          const classResponse = await axios.get(`http://localhost:8000/classes/${response.data.class_id}`);
          setClassData(classResponse.data);
        } catch (err) {
          console.error('Error fetching class data:', err);
          setClassData({ name: 'Class not found', level: '' });
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
    <Box className="app">
      <Header />
      <Box className="overview-container">
        <Box className="sticky-header">
          <Box className="greeting-section">
            <img src={profilePicture} alt="User Avatar" className="profile-avatar" />
            <Box className="greeting-text">
              <Typography variant="h5" color="black">Selamat Datang,</Typography>
              <Typography variant="h5" color="#1E5BF6" fontWeight="bold">{userName}</Typography>
              <Typography variant="subtitle1" color="#0177FB">
                {classData ? `${classData.name} - ${classData.level}` : 'Loading class...'}
              </Typography>
            </Box>
          </Box>
          <Box className="tabs-section">
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
          </Box>
        </Box>

        {/* Added wrapper for Grid */}
        <Box className="grid-container">
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={8}>
              <ProgressChart user={user} selectedCourse={selectedCourse} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Participation user={user} selectedCourse={selectedCourse} />
            </Grid>
            <Grid item xs={12}>
              <Achievement />
            </Grid>
            <Grid item xs={12}>
              <Recommendation user={user} selectedCourse={selectedCourse} />
            </Grid>
            <Grid item xs={12}>
              <Appreciation user={user} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Navbar />
    </Box>
  );
};

export default Overview;
