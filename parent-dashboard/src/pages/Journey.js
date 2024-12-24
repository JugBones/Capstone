import React from 'react';
import Navbar from '../components/Navbar';
import '../styling/Journey.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Journey = () => {
  // Mock data for the chart
  const chartData = {
    labels: ['4-1', '4-2', '5-1', '5-2', '6-1'],
    datasets: [
      {
        label: 'Student Learning Journey',
        data: [1, 2, 3, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: ['#CD7F32', '#C0C0C0', '#FFD700', '#C0C0C0', '#FFD700'],
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { drawBorder: false },
      },
    },
  };

  return (
    <div className="journey-page">
      <Navbar />
      <div className="journey-content">
        <h1 className="journey-title">Mari Lihat Journey</h1>
        <p className="journey-subtitle">
          <span className="highlight">Adi</span> selama ini!
        </p>
        <div className="journey-stats">
          <div className="stats-box">
            <p className="stats-value">18</p>
            <p className="stats-label">Topik Selesai</p>
          </div>
          <div className="stats-box">
            <p className="stats-value">4</p>
            <p className="stats-label">Topik Berjalan</p>
          </div>
        </div>
        <div className="student-statistics">
          <h3>Statistik Student</h3>
          <div className="chart-section">
            <div className="chart-header">
              <p className="chart-label">Level: Student Learning Journey</p>
              <a href="/full-view" className="full-view-link">Full View</a>
            </div>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="category-level">
            <h3>Category (Level):</h3>
            <div className="level-stairs">
                <div className="level bronze">
                🏃‍♂️ Bronze
                </div>
                <div className="level silver">
                Silver
                </div>
                <div className="level gold">
                Gold
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
