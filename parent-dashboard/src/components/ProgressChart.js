import React, { useEffect, useState } from "react";
import "../styling/ProgressChart.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

const ProgressChart = ({ user, selectedCourse }) => {
  const [progressData, setProgressData] = useState([]);
  const [progressLevel, setProgressLevel] = useState("Bronze");
  const [expandedIndex, setExpandedIndex] = useState(null);


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

  const progressDescriptions = {
    Kehadiran: "Menunjukkan seberapa konsisten siswa menghadiri kelas.",
    Keaktifan: "Menilai keaktifan siswa dalam diskusi dan aktivitas kelas.",
    Pemahaman: "Mengukur seberapa baik siswa memahami materi pelajaran.",
    "Penyelesaian Tugas": "Mengindikasikan sejauh mana siswa menyelesaikan tugas mereka.",
  };

  const getBarColor = (value) => {
    if (value <= 35) return "red";
    if (value < 50) return "orange";
    if (value >= 50 && value <= 60) return "yellow";
    if (value > 60) return "#0652DD";
    return "gray";
  };

  const getImprovementTips = (progressType, value) => {
    let tips = "";
    if (value < 50) {
      tips += "⚡ Yuk, tingkatkan! Mulailah dengan menetapkan target harian untuk lebih teratur.";
    } else if (value >= 50 && value <= 75) {
      tips += "🌟 Hebat! Pertahankan momentum dan terus aktif dalam kelas ya!";
    } else {
      tips += "🎉 Luar biasa! Kamu hanya perlu menjaga konsistensimu!";
    }
    return tips;
  };

  const determineProgressLevel = (data) => {
    const averageScore = (
      (data.attendance + data.activity + data.understanding + data.task_completion) / 4
    );
    if (averageScore >= 75) return "Gold";
    if (averageScore >= 50) return "Silver";
    return "Bronze";
  };

  const fetchProgressData = async () => {
    if (user && selectedCourse) {
      try {
        const response = await axios.get(`http://localhost:8000/progress/${user.uid}`, {
          params: { course_name: selectedCourse },
        });
        const progress = response.data[0]; // Assume the first entry for simplicity
        const updatedProgressData = [
          { name: "Kehadiran", value: progress.attendance, icon: "🪑" },
          { name: "Keaktifan", value: progress.activity, icon: "🖐️" },
          { name: "Pemahaman", value: progress.understanding, icon: "💡" },
          { name: "Penyelesaian Tugas", value: progress.task_completion, icon: "📋" },
        ];
        setProgressData(updatedProgressData.map(item => ({
          ...item,
          color: getBarColor(item.value),
        })));

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

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    fetchProgressData();
  }, [user, selectedCourse]);

  return (
    <div className="progress-container">
      <h3 className="progress-title">🏆 Progres Student (Keseluruhan)</h3>
      <div className="progress-list">
        {progressData.map((item, index) => (
          <div key={index} className="progress-item">
            <div
              className="progress-header"
              onClick={() => toggleExpand(index)}
              style={{ cursor: "pointer" }}
            >
              <span className="progress-icon">{item.icon}</span>
              <span>{item.name}</span>
              {expandedIndex === index ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
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
            {expandedIndex === index && (
              <div className="progress-description">
                <p className="description-text">
                  📝 {progressDescriptions[item.name]}
                </p>
                <p className="tips-text">
                  {getImprovementTips(item.name, item.value)}
                </p>
              </div>
            )}
          </div>
        ))}
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
