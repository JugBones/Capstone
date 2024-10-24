import React, { useState, useEffect } from 'react';
import '../styling/ProgressChart.css';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

// Data for the chart
const data = [
  { name: 'Legend1', value: 39, fill: '#82ca9d' },
  { name: 'Legend2', value: 38, fill: '#8884d8' },
  { name: 'Legend3', value: 27, fill: '#83a6ed' },
  { name: 'Legend4', value: 22, fill: '#ffdb5c' },
];

// Modal component to display chart details
const DetailsModal = ({ data, onClose }) => {
  // Lock scroll and pointer events on the body when modal is open
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

  // Function to handle opening the modal
  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="progress-chart-container">
      <h3> Progres Student </h3>
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
