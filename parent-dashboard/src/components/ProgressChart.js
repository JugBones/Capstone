import React from "react";
import "../styling/ProgressChart.css";

const ProgressChart = () => {
  // Mockup data
  const mockData = [
    { name: "Kehadiran", value: 80, color: "#0652DD", icon: "🪑" },
    { name: "Keaktifan", value: 50, color: "#ffc107", icon: "🖐️" },
    { name: "Pemahaman", value: 30, color: "#e58e26", icon: "💡" },
    { name: "Penyelesaian Tugas", value: 30, color: "#e58e26", icon: "📋" },
  ];

  return (
    <div>
      <h3 className="progress-title">🏆 Progres Student (Keseluruhan) </h3>
      <div className="progress-list">
        {mockData.map((item, index) => (
          <div key={index} className="progress-item">
            <div className="progress-header">
              <span className="progress-icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>
            <span className="progress-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;
