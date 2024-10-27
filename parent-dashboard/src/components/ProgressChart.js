import React, { useState, useEffect } from 'react';
import '../styling/ProgressChart.css';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import axios from 'axios';

// Modal component to display chart details
const DetailsModal = ({ data, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scroll
    document.body.classList.add('modal-open');

    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scroll when modal closes
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Detail Progress Anak</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.name}: {item.value}%
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ProgressChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('math'); // Default subject

  // Fetch data based on the selected subject
  const fetchData = async (subject) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/${subject}_progress`);
      // Transform data to fit the chart format
      const formattedData = [
        { name: 'Attendance Rate', value: response.data.attendance_rate, fill: '#82ca9d' },
        { name: 'Stickiness Rate', value: response.data.stickiness_rate, fill: '#8884d8' },
        { name: 'Polling Understanding', value: response.data.polling_understanding, fill: '#83a6ed' },
      ];
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedSubject);
  }, [selectedSubject]);

  // Function to handle opening the modal
  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle subject selection change
  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="progress-chart-container">
      <h3>Progres Student</h3>
      <div className="subject-selection">
        <button onClick={() => handleSubjectChange('math')}>Matematika</button>
        <button onClick={() => handleSubjectChange('physics')}>Fisika</button>
      </div>

      <RadialBarChart
        width={300}
        height={300}
        cx={150}
        cy={150}
        innerRadius={20}
        outerRadius={140}
        barSize={10}
        data={data}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ left: 10 }} />
      </RadialBarChart>

      <button className="view-details-btn" onClick={handleViewDetails}>
        View Details
      </button>

      {/* Modal that shows chart details */}
      {isModalOpen && <DetailsModal data={data} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProgressChart;
