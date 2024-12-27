import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../styling/Appreciation.css";
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Import assets directly
import teacherAvatar from "../assets/colearn_teacher2.webp";
import aiLogo from "../assets/colearn-logo-square.png";

const Appreciation = ({ user }) => {
  const [appreciations, setAppreciations] = useState([]);
  const [aiFeedback, setAiFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const messages = [
    "-- Kami sedang memikirkan saran terbaik untuk kamu ya, Parents. Mohon ditunggu. --"
  ];

  // Typewriter effect
  useEffect(() => {
    const handleTyping = () => {
      const currentMessage = messages[loopNum % messages.length];
      const isComplete = !isDeleting && loadingMessage === currentMessage;

      if (!isDeleting && loadingMessage !== currentMessage) {
        setLoadingMessage(currentMessage.substring(0, loadingMessage.length + 1));
        setTypingSpeed(100);
      } else if (isDeleting && loadingMessage !== "") {
        setLoadingMessage(currentMessage.substring(0, loadingMessage.length - 1));
        setTypingSpeed(50);
      } else if (!isDeleting && isComplete) {
        setIsDeleting(true);
        setTypingSpeed(100);
      } else if (isDeleting && loadingMessage === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [loadingMessage, isDeleting, typingSpeed, loopNum, messages]);

  // Fetch teacher appreciations and optionally AI feedback
  const fetchAppreciations = async (includeAi = false) => {
    if (!user?.uid) {
      console.error("User UID is undefined!");
      return;
    }

    try {
      const url = `http://localhost:8000/appreciations/${user.uid}?include_ai=${includeAi}`;
      setLoading(true);
      const response = await axios.get(url);

      const { feedback } = response.data;
      const teacherFeedback = feedback.filter((item) => !item.teacher_name.includes("AI Feedback"));
      const aiFeedbackData = feedback.filter((item) => item.teacher_name.includes("AI Feedback"));

      setAppreciations(teacherFeedback);
      if (includeAi) setAiFeedback(aiFeedbackData);
    } catch (error) {
      console.error("Error fetching appreciations:", error);
      setAppreciations([]);
      setAiFeedback([]);
    } finally {
      setLoading(false);
      setAiLoading(false);

      if (includeAi) {
        setIsDisclaimerOpen(true); // Show disclaimer when AI feedback is generated
      }
    }
  };

  // Fetch teacher appreciations on component load
  useEffect(() => {
    fetchAppreciations(false);
  }, [user]);

  // Generate AI feedback when button is clicked
  const generateAiFeedback = async () => {
    setAiLoading(true);
    setLoopNum(0); // Restart typewriter effect
    setIsDeleting(false);
    await fetchAppreciations(true);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleDisclaimerClose = () => {
    setIsDisclaimerOpen(false);
  };

  return (
    <div className="appreciation-outer-container">
      <div className="appreciation-container">
        <div className="appreciation-header">
          <span className="thumb-emoji">👍</span>
          <h3 className="appreciation-title">Masukan dan Saran</h3>
        </div>
        <p className="appreciation-description">
          Berikut adalah pesan dari tutor dan AI tentang pembelajaran anak Anda.
        </p>
        <button
          className={`generate-ai-button`}
          onClick={generateAiFeedback}
          disabled={aiLoading}
        >
          {aiLoading ? "Tunggu sebentar AI sedang meproses penyajian kontek" : "Klik untuk Saran AI"}
        </button>

        {aiLoading && (
          <div className="typewriting-container">
            <p className="typewriting-animation">{loadingMessage}</p>
          </div>
        )}

        <div className="appreciation-list">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              {appreciations.length === 0 && aiFeedback.length === 0 && (
                <p className="no-data">Tidak ada data untuk ditampilkan.</p>
              )}

              {appreciations.map((item, index) => (
                <div
                  key={index}
                  className={`appreciation-card ${expandedIndex === index ? "expanded" : ""}`}
                  onClick={() => toggleExpand(index)}
                >
                  <Avatar alt={item.teacher_name} src={teacherAvatar} className="appreciation-avatar" />
                  <div className="appreciation-details">
                    <h4 className="appreciation-teacher">{item.teacher_name}</h4>
                    <ReactMarkdown
                      className="appreciation-message"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {expandedIndex === index ? item.message : `${item.message.slice(0, 100)}...`}
                    </ReactMarkdown>
                    <p className="appreciation-date">{item.date}</p>
                  </div>
                  {expandedIndex === index ? (
                    <ExpandLessIcon className="expand-icon" />
                  ) : (
                    <ExpandMoreIcon className="expand-icon" />
                  )}
                </div>
              ))}

              {aiFeedback.map((item, index) => (
                <div
                  key={`ai-${index}`}
                  className={`appreciation-card ai-feedback-card ${expandedIndex === `ai-${index}` ? "expanded" : ""}`}
                  onClick={() => toggleExpand(`ai-${index}`)}
                >
                  <Avatar alt="Saran AI" src={aiLogo} className="appreciation-avatar" />
                  <div className="appreciation-details">
                    <h4 className="appreciation-teacher ai-feedback">{item.teacher_name}</h4>
                    <ReactMarkdown
                      className="appreciation-message"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {expandedIndex === `ai-${index}` ? item.message : `${item.message.slice(0, 100)}...`}
                    </ReactMarkdown>
                    <p className="appreciation-date">{item.date}</p>
                  </div>
                  {expandedIndex === `ai-${index}` ? (
                    <ExpandLessIcon className="expand-icon" />
                  ) : (
                    <ExpandMoreIcon className="expand-icon" />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Disclaimer Modal */}
      <Dialog open={isDisclaimerOpen} onClose={handleDisclaimerClose}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <p>
            Konten yang dihasilkan oleh AI mungkin tidak selalu akurat. Mohon berhati-hati
            dalam mempertimbangkan saran ini, terutama untuk keputusan yang mempengaruhi pendidikan anak Anda. Pertimbangkan setiap saran dengan hati-hati dan bijaksana.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisclaimerClose} color="primary">
            Mengerti
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Appreciation;
