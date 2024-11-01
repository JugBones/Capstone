from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    date = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False)
    firebase_uid = Column(String(255), nullable=False)


class MathProgress(Base):
    __tablename__ = "math_progress"

    id = Column(Integer, primary_key=True, index=True)
    attendance_rate = Column(Float, nullable=False)
    stickiness_rate = Column(Float, nullable=False)
    polling_understanding = Column(Float, nullable=False)
    firebase_uid = Column(String(255), nullable=False)


class PhysicsProgress(Base):
    __tablename__ = "physics_progress"

    id = Column(Integer, primary_key=True, index=True)
    attendance_rate = Column(Float, nullable=False)
    stickiness_rate = Column(Float, nullable=False)
    polling_understanding = Column(Float, nullable=False)
    firebase_uid = Column(String(255), nullable=False)


class Participation(Base):
    __tablename__ = "participation"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, nullable=False)  # Add this field
    zoom_video = Column(Float, nullable=False)
    zoom_audio = Column(Float, nullable=False)
    zoom_chat = Column(Float, nullable=False)


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    schedules = relationship("Schedule", back_populates="subject")


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    firebase_uid = Column(String(255), nullable=False)
    subject = relationship("Subject", back_populates="schedules")


class ClassLevel(Base):
    __tablename__ = "class_levels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)  # e.g., "SMP - Kelas 7"


class Curriculum(Base):
    __tablename__ = "curriculums"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)  # e.g., "Kurikulum Merdeka"


class Syllabus(Base):
    __tablename__ = "syllabus"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String(255), nullable=False)  # e.g., "Matematika" or "Fisika"
    period_start = Column(Date, nullable=False)  # Start date for the period
    period_end = Column(Date, nullable=False)  # End date for the period
    topic = Column(
        String(255), nullable=False
    )  # e.g., "Pengenalan Bilangan dan Operasi Dasar"
    class_level = Column(String(50), nullable=False)  # e.g., "SD - Kelas 4"
    curriculum = Column(String(50), nullable=False)  # e.g., "Kurikulum Merdeka"
    year_semester = Column(
        String(50), nullable=False
    )  # e.g., "2024 - 2025 - Semester 1"


class Appreciation(Base):
    __tablename__ = "appreciations"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(255), nullable=False)
    teacher_name = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    firebase_uid = Column(String(255), nullable=False)
