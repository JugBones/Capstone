import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/ProgressChart.css";

const ProgressChart = ({ user }) => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8000/progress/${user.uid}`);
          setProgressData([
            { name: "Kehadiran", value: response.data[0]?.attendance || 0, color: "#0652DD", icon: "🪑" },
            { name: "Keaktifan", value: response.data[0]?.activity || 0, color: "#ffc107", icon: "🖐️" },
            { name: "Pemahaman", value: response.data[0]?.understanding || 0, color: "#e58e26", icon: "💡" },
            { name: "Penyelesaian Tugas", value: response.data[0]?.task_completion || 0, color: "#e58e26", icon: "📋" },
          ]);
        } catch (err) {
          console.error("Error fetching progress data:", err);
        }
      }
    };

    fetchProgressData();
  }, [user]);

  return (
    <div>
      <h3 className="progress-title">🏆 Progres Student (Keseluruhan)</h3>
      <div className="progress-list">
        {progressData.map((item, index) => (
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
