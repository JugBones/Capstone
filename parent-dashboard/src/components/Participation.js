import React, { useState } from 'react';
import '../styling/Participation.css';

const Participation = () => {
  const [selectedSubject, setSelectedSubject] = useState('Pengenalan Bilangan');

  // Mock data for participation
  const participationData = {
    audio: 7,
    chat: 10,
    video: 15,
    polling: '2 dari 2',
  };

  const subjects = ['Pengenalan Bilangan', 'Geometri', 'Statistika']; // Dropdown options

  return (
    <>
      <h3 className="title">
        🙋‍♂️ Partisipasi dalam Kelas
      </h3>

      {/* Dropdown for subjects */}
      <select
        className="subject-dropdown"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      {/* Participation cards */}
      <div className="participation-cards">
        <div className="card">
          <p className="card-title">Total</p>
          <h4>{participationData.audio} kali</h4>
          <p>Interaksi lewat audio</p>
        </div>
        <div className="card">
          <p className="card-title">Total</p>
          <h4>{participationData.chat} kali</h4>
          <p>Diskusi via chat</p>
        </div>
        <div className="card">
          <p className="card-title">Total</p>
          <h4>{participationData.video} kali</h4>
          <p>Interaksi lewat video</p>
        </div>
        <div className="card">
          <p className="card-title">Total</p>
          <h4>{participationData.polling}</h4>
          <p>Polling dijawab</p>
        </div>
      </div>
    </>
  );
};

export default Participation;
