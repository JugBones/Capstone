import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/ProgressChart.css";

const ProgressChart = ({ user, selectedCourse }) => {
  const [progressData, setProgressData] = useState([]);
  const [progressLevel, setProgressLevel] = useState("Bronze");

  const getBarColor = (value) => {
    if (value <= 35) return "red";
    if (value < 50) return "orange";
    if (value >= 50 && value <= 60) return "yellow";
    if (value > 60) return "#0652DD";
    return "gray";
  };

  const determineProgressLevel = (data) => {
    const averageScore = (
      (data.attendance + data.activity + data.understanding + data.task_completion) / 4
    );
    if (averageScore >= 75) return "Gold";
    if (averageScore >= 50) return "Silver";
    return "Bronze";
  };

  const updateProgressLevel = async (level) => {
    try {
      await axios.put(`http://localhost:8000/progress/${user.uid}`, {
        course_name: selectedCourse,
        level: level,
      });
      console.log("Progress level updated successfully");
    } catch (err) {
      console.error("Error updating progress level:", err);
    }
  };
  
  
  const fetchProgressData = async () => {
    if (user && selectedCourse) {
      try {
        const response = await axios.get(`http://localhost:8000/progress/${user.uid}`, {
          params: { course_name: selectedCourse },
        });
        const progress = response.data[0]; // Assume the first entry for simplicity
        setProgressData([
          { name: "Kehadiran", value: progress.attendance, color: "#0652DD", icon: "🪑" },
          { name: "Keaktifan", value: progress.activity, color: "#ffc107", icon: "🖐️" },
          { name: "Pemahaman", value: progress.understanding, color: "#e58e26", icon: "💡" },
          { name: "Penyelesaian Tugas", value: progress.task_completion, color: "#e58e26", icon: "📋" },
        ]);
        const level = determineProgressLevel(progress);
        setProgressLevel(level);
  
        // Update progress level in the database
        await updateProgressLevel(level);
      } catch (err) {
        console.error("Error fetching progress data:", err);
        setProgressData([]);
      }
    }
  };
  

  useEffect(() => {
    fetchProgressData();
  }, [user, selectedCourse]);

  return (
    <div className="progress-container">
      <h3 className="progress-title">🏆 Progres Student (Keseluruhan)</h3>
      <div className="progress-list">
        {progressData.length > 0 ? (
          progressData.map((item, index) => (
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
                    backgroundColor: getBarColor(item.value),
                  }}
                ></div>
              </div>
              <span className="progress-value">{item.value}%</span>
            </div>
          ))
        ) : (
          <p>No progress data available</p>
        )}
      </div>
      <div className="progress-level-container">
        <p className="progress-level-label">Progres Level:</p>
        <div className={`progress-level-badge ${progressLevel.toLowerCase()}`}>
          <div className={`medal ${progressLevel.toLowerCase()}`}></div>
          <span className="progress-level-text">{progressLevel}</span>
        </div>
      </div>
    </div>
  );  
};

export default ProgressChart;
