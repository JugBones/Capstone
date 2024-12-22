from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    firebase_uid = Column(String(255), nullable=False, unique=True)
    class_id = Column(Integer, ForeignKey("Class.id"))
    achievements = relationship("Achievement", back_populates="user")
    progress = relationship("Progress", back_populates="user")
    appreciations = relationship("Appreciation", back_populates="user")
    participations = relationship("Participation", back_populates="user")


class Class(Base):
    __tablename__ = "Class"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    level = Column(String(255), nullable=False)
    subtopics = relationship("Subtopic", back_populates="class_")


class Subtopic(Base):
    __tablename__ = "Subtopic"
    id = Column(Integer, primary_key=True, autoincrement=True)
    course_id = Column(Integer, ForeignKey("Course.id"), nullable=False)
    class_id = Column(Integer, ForeignKey("Class.id"), nullable=False)
    name = Column(String(255), nullable=False)
    class_ = relationship("Class", back_populates="subtopics")
    participations = relationship("Participation", back_populates="subtopic")


class Course(Base):
    __tablename__ = "Course"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    progress = relationship("Progress", back_populates="course")
    recommendations = relationship("Recommendation", back_populates="course")


class Progress(Base):
    __tablename__ = "Progress"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("Course.id"), nullable=False)
    level = Column(String(255))
    attendance = Column(Integer)
    activity = Column(Integer)
    understanding = Column(Integer)
    task_completion = Column(Integer)
    user = relationship("User", back_populates="progress")
    course = relationship("Course", back_populates="progress")


class Recommendation(Base):
    __tablename__ = "Recommendation"
    id = Column(Integer, primary_key=True, autoincrement=True)
    course_id = Column(Integer, ForeignKey("Course.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    url = Column(String(255))
    course = relationship("Course", back_populates="recommendations")


class Participation(Base):
    __tablename__ = "Participation"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    subtopic_id = Column(Integer, ForeignKey("Subtopic.id"), nullable=False)
    audio = Column(Integer)
    zoom = Column(Integer)
    chat = Column(Integer)
    poll = Column(String(255), nullable=False)
    user = relationship("User", back_populates="participations")
    subtopic = relationship("Subtopic", back_populates="participations")


class Achievement(Base):
    __tablename__ = "Achievement"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("Course.id"), nullable=False)
    badge_name = Column(String(255), nullable=False)
    date_earned = Column(Date, nullable=False)
    user = relationship("User", back_populates="achievements")


class Appreciation(Base):
    __tablename__ = "Appreciation"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    teacher_name = Column(String(255), nullable=False)
    message = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)
    user = relationship("User", back_populates="appreciations")


class Syllabus(Base):
    __tablename__ = "Syllabus"
    id = Column(Integer, primary_key=True, autoincrement=True)
    subject = Column(String(255), nullable=False)
    period_start = Column(Date, nullable=False)
    period_end = Column(Date, nullable=False)
    topic = Column(String(255), nullable=False)
    class_level = Column(String(50), nullable=False)
    curriculum = Column(String(50), nullable=False)
    year_semester = Column(String(50), nullable=False)
