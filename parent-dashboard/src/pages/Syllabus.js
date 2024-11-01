import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box, Select, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import '../styling/Syllabus.css';

const Syllabus = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classLevel, setClassLevel] = useState('SD - Kelas 4');
  const [curriculum, setCurriculum] = useState('Kurikulum Merdeka');
  const [yearSemester, setYearSemester] = useState('2024 - 2025 - Semester 1');
  const [syllabusData, setSyllabusData] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchSyllabus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/syllabus', {
        params: {
          class_level: classLevel,
          curriculum,
          year_semester: yearSemester
        }
      });
      console.log("Syllabus data received:", response.data);
      setSyllabusData(response.data && Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching syllabus data:', error);
      setSyllabusData([]);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, [classLevel, curriculum, yearSemester]);

  const groupBySubject = () => {
    const subjects = {};
    syllabusData.forEach((item) => {
      if (!subjects[item.subject]) {
        subjects[item.subject] = [];
      }
      subjects[item.subject].push(item);
    });
    return subjects;
  };

  const subjectGroups = groupBySubject();

  return (
    <Box className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Box className="syllabus-container" p={3}>
        <Typography className="title" variant="h4" gutterBottom>
          Jadwal kelas dan materi belajar
        </Typography>
        <Box display="flex" gap="1rem" mb={2} className="dropdown-container">
          <Select value={classLevel} onChange={(e) => setClassLevel(e.target.value)}>
            <MenuItem value="SD - Kelas 4">SD - Kelas 4</MenuItem>
            <MenuItem value="SD - Kelas 5">SD - Kelas 5</MenuItem>
            <MenuItem value="SD - Kelas 6">SD - Kelas 6</MenuItem>
            <MenuItem value="SMP - Kelas 7">SMP - Kelas 7</MenuItem>
            <MenuItem value="SMP - Kelas 8">SMP - Kelas 8</MenuItem>
            <MenuItem value="SMP - Kelas 9">SMP - Kelas 9</MenuItem>
          </Select>
          <Select value={curriculum} onChange={(e) => setCurriculum(e.target.value)}>
            <MenuItem value="Kurikulum Merdeka">Kurikulum Merdeka</MenuItem>
            <MenuItem value="Kurikulum Nasional">Kurikulum Nasional</MenuItem>
          </Select>
          <Select value={yearSemester} onChange={(e) => setYearSemester(e.target.value)}>
            <MenuItem value="2024 - 2025 - Semester 1">2024 - 2025 - Semester 1</MenuItem>
            <MenuItem value="2024 - 2025 - Semester 2">2024 - 2025 - Semester 2</MenuItem>
          </Select>
        </Box>

        <Box>
          {Object.keys(subjectGroups).length > 0 ? (
            Object.keys(subjectGroups).map((subject, index) => (
              <Box key={index} mb={3}>
                <Typography variant="h5" color="primary" style={{ marginBottom: '10px' }}>{subject}</Typography>
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ backgroundColor: '#1a73e8' }}>
                        <TableCell style={{ color: '#ffffff', fontWeight: 'bold' }}>Periode</TableCell>
                        <TableCell style={{ color: '#ffffff', fontWeight: 'bold' }}>Bab</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subjectGroups[subject].map((item, itemIndex) => (
                        <TableRow key={itemIndex} style={itemIndex % 2 === 0 ? { backgroundColor: '#f0f4f8' } : {}}>
                          <TableCell>{item.period_start} - {item.period_end}</TableCell>
                          <TableCell>{item.topic}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          ) : (
            <Typography variant="body1">Maaf, dear Parents. Data untuk Syllabus ini belum tersedia.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Syllabus;
