import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import '../styling/Journey.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-plugin-annotation'; // For annotations

const Journey = () => {
  const [user] = useAuthState(auth);
  const userName = user?.email ? user.email.split('@')[0] : user?.displayName || 'User';
  // Get the selected subject from localStorage, default to "Matematika" if not set
  const [selectedCourse, setselectedCourse] = useState(
    localStorage.getItem('selectedCourse') || 'Matematika'
  );

  // Datasets for different subjects
  const datasets = {
    Matematika: [20, 40, 75, 50, 90],
    Fisika: [15, 45, 52, 55, 80],
  };

  const breakdownData = {
    Matematika: [
      { Kehadiran: 60, Keaktifan: 40, Pemahaman: 70, PenyelesaianTugas: 80, Badge: 'Bronze' },
      { Kehadiran: 70, Keaktifan: 50, Pemahaman: 75, PenyelesaianTugas: 85, Badge: 'Silver' },
      { Kehadiran: 85, Keaktifan: 60, Pemahaman: 90, PenyelesaianTugas: 95, Badge: 'Gold' },
      { Kehadiran: 75, Keaktifan: 55, Pemahaman: 80, PenyelesaianTugas: 88, Badge: 'Silver' },
      { Kehadiran: 90, Keaktifan: 70, Pemahaman: 95, PenyelesaianTugas: 98, Badge: 'Gold' },
    ],
    Fisika: [
      { Kehadiran: 55, Keaktifan: 45, Pemahaman: 65, PenyelesaianTugas: 75, Badge: 'Bronze' },
      { Kehadiran: 65, Keaktifan: 55, Pemahaman: 70, PenyelesaianTugas: 80, Badge: 'Silver' },
      { Kehadiran: 75, Keaktifan: 57, Pemahaman: 73, PenyelesaianTugas: 80, Badge: 'Silver' },
      { Kehadiran: 70, Keaktifan: 60, Pemahaman: 75, PenyelesaianTugas: 85, Badge: 'Silver' },
      { Kehadiran: 85, Keaktifan: 70, Pemahaman: 90, PenyelesaianTugas: 95, Badge: 'Gold' },
    ],
  };

  const chartData = {
    labels: ['4-1', '4-2', '5-1', '5-2', '6-1'],
    datasets: [
      {
        
      label: `Perjalanan Belajar ${selectedCourse}`,
      data: datasets[selectedCourse],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      pointBackgroundColor: datasets[selectedCourse].map((value, index) => {
        const badge = breakdownData[selectedCourse][index].Badge;
        if (badge === 'Bronze') return '#CD7F32'; // Bronze
        if (badge === 'Silver') return '#C0C0C0'; // Silver
        if (badge === 'Gold') return '#FFD700'; // Gold
        return '#000000'; // Default 
      }),
      pointRadius: 6,
      tension: 0.4, // Adds curve to the line
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
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            const index = tooltipItem[0].dataIndex;
            const badge = breakdownData[selectedCourse][index].Badge;
            return `Checkpoint: ${tooltipItem[0].label} (Badge: ${badge})`;
          },
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const breakdown = breakdownData[selectedCourse][index];
            return [
              `Kehadiran: ${breakdown.Kehadiran}%`,
              `Keaktifan: ${breakdown.Keaktifan}%`,
              `Pemahaman: ${breakdown.Pemahaman}%`,
              `Penyelesaian Tugas: ${breakdown.PenyelesaianTugas}%`,
            ];
          },
        },
        displayColors: false,
        backgroundColor: '#ffffff',
        titleColor: '#0049bf',
        titleFont: { size: 14, weight: 'bold' },
        bodyColor: '#333333',
        bodyFont: { size: 12 },
        borderColor: '#0049bf',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
      annotation: {
        annotations: [
          {
            type: 'box',
            yScaleID: 'y',
            yMin: 0,
            yMax: 33,
            backgroundColor: 'rgba(205, 127, 50, 0.2)', // Bronze
          },
          {
            type: 'box',
            yScaleID: 'y',
            yMin: 33,
            yMax: 66,
            backgroundColor: 'rgba(192, 192, 192, 0.2)', // Silver
          },
          {
            type: 'box',
            yScaleID: 'y',
            yMin: 66,
            yMax: 100,
            backgroundColor: 'rgba(255, 215, 0, 0.2)', // Gold
          },
        ],
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 16, weight: 'bold' 
          },
        },
      },
      y: {
        grid: { drawBorder: false },
        min: 0,
        max: 100,
        ticks: {
          font: {
            size: 16, weight: 'bold' 
          },
          callback: function (value) {
            if (value <= 49) return "Bronze";
            if (value <= 74) return "Silver";
            if (value >= 75) return "Gold";
          },
          stepSize: 33,
        },
      },
    },
  };

  // Save the selected subject to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCourse', selectedCourse);
  }, [selectedCourse]);

  return (
    <div className="journey-page">
      <Navbar />
      <div className="journey-content">
        <h1 className="journey-title">Mari Lihat Journey</h1>
        <p className="journey-subtitle">
          <span className="highlight">{userName}</span> selama ini!
        </p>
        <div className="journey-tabs-section">
          <button
            className={`journey-tab-button ${selectedCourse === 'Matematika' ? 'active' : ''}`}
            onClick={() => setselectedCourse('Matematika')}
          >
            MATEMATIKA
          </button>
          <button
            className={`journey-tab-button ${selectedCourse === 'Fisika' ? 'active' : ''}`}
            onClick={() => setselectedCourse('Fisika')}
          >
            FISIKA
          </button>
        </div>
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
              <p>Perjalanan Belajar Bersama CoLearn</p>
              <a href="/journey" className="full-view-link">Full View</a>
            </div>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
