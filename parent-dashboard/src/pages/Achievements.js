import React, { useState } from "react";
import {
  AiOutlineStar,
  AiOutlineCheckCircle,
  AiOutlineTool,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  FaMountain,
  FaRegCalendarCheck,
  FaRunning,
  FaBookOpen,
  FaPuzzlePiece,
  FaBolt,
  FaUsers,
  FaBrain,
  FaFire,
  FaCalculator,
  FaAtom,
  FaRocket,
} from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import "../styling/Achievements.css";

const badges = [
  { id: 1, title: "Bintang Bersinar", progress: 70, status: "Dalam Proses", subject: "Keaktifan", tip: "Ikuti semua kelas selama satu bulan untuk mendapatkan lencana ini!", icon: <AiOutlineStar size={60} color="1E5BF6" /> },
  { id: 2, title: "Pelajar Konsisten", progress: 100, status: "Selesai", subject: "Keaktifan", tip: "", icon: <FaRegCalendarCheck size={60} color="FFD700" /> },
  { id: 3, title: "Nilai Sempurna", progress: 50, status: "Dalam Proses", subject: "Keaktifan", tip: "Raih nilai penuh pada kuis secara konsisten selama 2 minggu.", icon: <AiOutlineCheckCircle size={60} color="#1E5BF6" /> },
  { id: 4, title: "Penakluk Tantangan", progress: 90, status: "Dalam Proses", subject: "Keaktifan", tip: "Selesaikan semua topik sulit untuk mendapatkan lencana ini!", icon: <FaMountain size={60} color="#1E5BF6" /> },
  { id: 5, title: "Pelajar Tekun", progress: 100, status: "Selesai", tip: "", subject: "Keaktifan", icon: <FaRunning size={60} color="#FFD700" /> },
  { id: 6, title: "Ahli Rumus Matematika", progress: 30, status: "Dalam Proses", subject: "Matematika", tip: "Kerjakan proyek matematika dari article CoLearn terakpan rumusnya dalam eksperimen sederhana.", icon: <FaCalculator size={60} color="#1E5BF6" /> },
  { id: 7, title: "Ahli Konsep Fisika", progress: 45, status: "Dalam Proses", subject: "Fisika", tip: "Pelajari hukum Newton dan aplikasikan dalam praktek fisika dalam kehidupan sehari-hari.", icon: <FaRocket size={60} color="#1E5BF6" /> },
  { id: 8, title: "Penjelajah Materi", progress: 100, status: "Selesai", subject: "Keaktifan", tip: "", icon: <FaBookOpen size={60} color="#FFD700" /> },
  { id: 9, title: "Manajer Waktu", progress: 85, status: "Dalam Proses", subject: "Keaktifan", tip: "Selesaikan 8 tugas sebelum tempo waktu.", icon: <AiOutlineClockCircle size={60} color="#1E5BF6" /> },
  { id: 10, title: "Jenius Logika", progress: 60, status: "Dalam Proses", subject: "Keaktifan", tip: "Selesaikan 50 soal logika untuk mendapatkan lencana ini.", icon: <FaPuzzlePiece size={60} color="#1E5BF6" /> },
  { id: 11, title: "Kolaborator Tim", progress: 30, status: "Dalam Proses", subject: "Keaktifan", tip: "Bekerja sama dalam proyek kelompok untuk mendapatkan lencana ini.", icon: <FaUsers size={60} color="#1E5BF6" /> },
  { id: 12, title: "Pemecah Masalah", progress: 40, status: "Dalam Proses", subject: "Keaktifan", tip: "Selesaikan tantangan pemrograman atau perhitungan kompleks.", icon: <FaBrain size={60} color="#1E5BF6" /> },
  { id: 13, title: "Pembelajar Termotivasi", progress: 75, status: "Dalam Proses", subject: "Keaktifan", tip: "Tentukan tujuan belajar pribadi bulan ini dan capai!", icon: <FaFire size={60} color="#1E5BF6" /> },

  // Additional Math and Physics Badges
  { id: 14, title: "Ahli Trigonometri", progress: 50, status: "Dalam Proses", subject: "Matematika", tip: "Selesaikan 10 latihan soal trigonometri dengan akurasi tinggi.", icon: <FaCalculator size={60} color="#1E5BF6" /> },
  { id: 15, title: "Ahli Gerak Parabola", progress: 80, status: "Dalam Proses", subject: "Fisika", tip: "Pahami dan pecahkan 8 soal tentang gerak parabola.", icon: <FaAtom size={60} color="#1E5BF6" /> },
  { id: 16, title: "Ahli Operasi Dasar", progress: 40, status: "Dalam Proses", subject: "Matematika", tip: "Selesaikan 20 soal Operasi Dasar dengan benar.", icon: <AiOutlineTool size={60} color="#1E5BF6" /> },
  { id: 17, title: "Ahli Elektromagnetik", progress: 100, status: "Selesai", subject: "Fisika", tip: "Pahami konsep medan listrik dan magnet serta aplikasikan dalam soal.", icon: <FaBolt size={60} color="#FFD700" /> },
  { id: 18, title: "Ahli Statistik", progress: 100, status: "Selesai", subject: "Matematika", tip: "", icon: <FaBookOpen size={60} color="#FFD700" /> },
  { id: 19, title: "Pengamat Hukum Newton", progress: 55, status: "Dalam Proses", subject: "Fisika", tip: "Analisis dan pecahkan soal berdasarkan ketiga hukum Newton.", icon: <FaBrain size={60} color="#1E5BF6" /> },
  { id: 20, title: "Ahli Termodinamika", progress: 65, status: "Dalam Proses", subject: "Fisika", tip: "Pahami konsep kalor dan energi dalam soal-soal termodinamika. Lalu, kerjakan 3 soal praktek terkait termodinamika", icon: <FaFire size={60} color="#1E5BF6" /> },
  { id: 21, title: "Ahli Pecahan", progress: 40, status: "Dalam Proses", subject: "Matematika", tip: "Latih soal pecahan seperti penjumlahan dan pengurangan pecahan. Dan tunjukkan hasil latihan kepada instruktur.", icon: <FaCalculator size={60} color="#1E5BF6" /> },
  { id: 22, title: "Ahli Gaya dan Energi", progress: 60, status: "Dalam Proses", subject: "Fisika", tip: "Pelajari gaya gravitasi dan energi kinetik dasar.", icon: <FaMountain size={60} color="#1E5BF6" /> },
  { id: 23, title: "Ahli Perkalian", progress: 70, status: "Dalam Proses", subject: "Matematika", tip: "Kuasai tabel perkalian dan latihan soal perkalian.", icon: <FaPuzzlePiece size={60} color="#1E5BF6" /> },
  { id: 24, title: "Ahli Gerak Lurus", progress: 55, status: "Dalam Proses", subject: "Fisika", tip: "Pelajari konsep jarak, waktu, dan kecepatan sederhana.", icon: <FaBolt size={60} color="#1E5BF6" /> },
];

const Achievements = () => {
  const [open, setOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [filterCompletion, setFilterCompletion] = useState("Semua");
  const [filterSubject, setFilterSubject] = useState("Semua");

  const handleOpen = (badge) => {
    setSelectedBadge(badge);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBadge(null);
  };

  const filteredBadges = badges.filter((badge) => {
    const completionMatch =
      filterCompletion === "Semua" ||
      (filterCompletion === "Komplit" && badge.progress === 100) ||
      (filterCompletion === "In-Progress" && badge.progress < 100);

    const subjectMatch =
      filterSubject === "Semua" || badge.subject === filterSubject;

    return completionMatch && subjectMatch;
  });

  return (
    <div className="achievements-container">
      <h1 className="achievements-title">Lencana Pencapaian</h1>
  
      {/* Sorting Options */}
      <div className="sorting-container">
        <div className="sorting-option">
          <label htmlFor="completion">Status:</label>
          <select
            id="completion"
            value={filterCompletion}
            onChange={(e) => setFilterCompletion(e.target.value)}
            className="truncate-option"
          >
            <option value="Semua">Semua</option>
            <option value="In-Progress">Dalam Proses</option>
            <option value="Komplit">Selesai</option>
          </select>
        </div>
        <div className="sorting-option">
          <label htmlFor="subject">Subjek:</label>
          <select
            id="subject"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="truncate-option2"
          >
            <option value="Semua">Semua</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Keaktifan">Keaktifan</option>
          </select>
        </div>
      </div>

      <div className="badge-grid">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`badge-card ${badge.progress === 100 ? "completed" : "in-progress"}`}
            onClick={() => handleOpen(badge)}
          >
            <div className="badge-icon">{badge.icon}</div>
            <p className="badge-title">{badge.title}</p>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="badge-modal">
          {selectedBadge && (
            <>
              <div className="badge-popup-header">{selectedBadge.icon}</div>
              <h2 className="modal-title">{selectedBadge.title}</h2>
              <p className="modal-status">
                Status:{" "}
                <strong style={{ color: selectedBadge.progress === 100 ? "#4CAF50" : "#FFA500" }}>
                  {selectedBadge.status}
                </strong>
              </p>
              <div className="progress-sections">
                <p className="progress-texts">Progress: {selectedBadge.progress}%</p>
                <div className="progress-bar-containers">
                  <div
                    className="progress-bar-fills"
                    style={{ width: `${Math.min(selectedBadge.progress, 100)}%` }}
                  ></div>
                </div>
                {selectedBadge.progress < 100 && (
                  <p className="remaining-progress">
                    {100 - selectedBadge.progress}% lagi untuk meraih lencana ini! <br />
                    <span className="badge-tip">{selectedBadge.tip}</span>
                  </p>
                )}
              </div>
              {selectedBadge.progress === 100 && (
                <p className="completed-date">
                  Dicapai pada: <strong>22 Desember 2024</strong>
                </p>
              )}
            </>
          )}
        </Box>
      </Modal>

      {/* Legend Section */}
      <div className="legend-container">
        <div className="legend-item">
          <span className="legend-color completed"></span> Selesai (Kuning)
        </div>
        <div className="legend-item">
          <span className="legend-color in-progress"></span> Dalam Proses (Biru)
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Achievements;
