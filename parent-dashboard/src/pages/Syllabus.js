import React, { useState } from 'react';
import Sidebar from '../components/Navbar';
import Header from '../components/Header';
import { Box, Typography } from '@mui/material';
import '../styling/Syllabus.css';

const Syllabus = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Box className="syllabus-container">
        {/* Title */}
        <Typography className="title" variant="h4" gutterBottom>
          Jadwal Kelas dan Materi Belajar
        </Typography>

        {/* Iframe to embed CoLearn Syllabus Page */}
        <Box className="iframe-container">
          <iframe
            src="https://colearn.id/jadwal"
            title="CoLearn Syllabus"
            className="syllabus-iframe"
            allowFullScreen
          />
        </Box>

        {/* Additional Note */}
        <Typography className="note" variant="body1">
          Halaman ini menampilkan jadwal kelas langsung dari situs CoLearn. Anda dapat menjelajah langsung di sini tanpa perlu navigasi tambahan.
        </Typography>
      </Box>
    </Box>
  );
};

export default Syllabus;
