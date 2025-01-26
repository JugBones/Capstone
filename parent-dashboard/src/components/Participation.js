import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/Participation.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Participation = ({ user, selectedCourse }) => {
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [participationData, setParticipationData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/subtopics/${selectedCourse}`
        );
        setSubtopics(response.data);
        setSelectedSubtopic(response.data[0]?.id || null);
      } catch (err) {
        console.error(err);
        setSubtopics([]);
        setError("Failed to fetch subtopics.");
      }
    };
    fetchSubtopics();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchParticipationData = async () => {
      if (user && selectedSubtopic) {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/participation/${user.uid}/${selectedSubtopic}`
          );
          setParticipationData(response.data);
          setError(null);
        } catch (err) {
          console.error(err);
          setParticipationData({});
          setError("No participation data found for this subtopic.");
        }
      }
    };
    fetchParticipationData();
  }, [user, selectedSubtopic]);

  return (
    <div className="participation-container">
      <h3 className="title">🙋‍♂️ Partisipasi Dalam Kelas</h3>
      <select
        value={selectedSubtopic || ""}
        onChange={(e) => setSelectedSubtopic(e.target.value)}
        className="subtopic-dropdown"
      >
        {subtopics.map((subtopic) => (
          <option key={subtopic.id} value={subtopic.id}>
            {subtopic.name}
          </option>
        ))}
      </select>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="participation-cards">
          <div className="card">
            <h4>Total</h4>
            <p>Audio: {participationData.audio || 0} kali</p>
          </div>
          <div className="card">
            <h4>Total</h4>
            <p>Video: {participationData.video || 0} kali</p>
          </div>
          <div className="card">
            <h4>Total</h4>
            <p>Chat: {participationData.chat || 0} kali</p>
          </div>
          <div className="card">
            <h4>Total</h4>
            <p>Polls: {participationData.poll || 0} terjawab</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Participation;
