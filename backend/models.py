from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    date = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False)


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
