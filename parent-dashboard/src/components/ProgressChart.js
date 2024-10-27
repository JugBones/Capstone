import React, { useState, useEffect } from 'react';
import '../styling/ProgressChart.css';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const DetailsModal = ({ data, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      document.body.style.overflow = 'auto';
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
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("math");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/${subject}_progress`);
        if (response.ok) {
          const data = await response.json();
          const formattedData = [
            { name: 'Attendance Rate', value: data[0].attendance_rate, fill: '#82ca9d' },
            { name: 'Stickiness Rate', value: data[0].stickiness_rate, fill: '#8884d8' },
            { name: 'Polling Understanding', value: data[0].polling_understanding, fill: '#ffc658' }
          ];
          setData(formattedData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [subject]);

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="progress-chart-container">
      <h3>Progres Student</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select onChange={(e) => setSubject(e.target.value)} value={subject}>
          <option value="math">Matematika</option>
          <option value="physics">Fisika</option>
        </select>      
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

      {isModalOpen && <DetailsModal data={data} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProgressChart;
